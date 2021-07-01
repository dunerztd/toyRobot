
const {
  initialPlacePrompt,
  incorrectPlacePrompt,
  fallOffTablePrompt
} = require('./prompts')

const toyRobot = async () => {

  let inputInitialPlace = await initialPlacePrompt()
  
  // exit program
  if (exitProgramCheck(inputInitialPlace)) return

  let splitInputInitialPlace = splitStringBySpace(inputInitialPlace)
      
  // PLACE correct format
  if (splitInputInitialPlace[0] === 'PLACE') {
        
    let coordsFacing = splitStringByCommas(splitInputInitialPlace[1])
    let coordsX = coordsFacing[0]
    let coordsY = coordsFacing[1]
    let facing = coordsFacing[2]

    while (!fallOffBoardCheck(coordsX, coordsY)) {

      let inputPlaceCorrectCoords = await fallOffTablePrompt()

      // exit program
      if (exitProgramCheck(inputPlaceCorrectCoords)) return

      let splitInputPlaceCorrectCoords = splitStringBySpace(inputPlaceCorrectCoords)
      if (splitInputPlaceCorrectCoords[0] === 'PLACE') {
            
        coordsFacing = splitStringByCommas(splitInputPlaceCorrectCoords[1])
        coordsX = coordsFacing[0]
        coordsY = coordsFacing[1]
        facing = coordsFacing[2]
      }
    }
      
  // PLACE incorrect format
  } else {
    let splitInput2 = splitInputInitialPlace

    while (splitInput2[0] !== 'PLACE') {

      let inputIncorrectPlacePrompt = await incorrectPlacePrompt()

      // exit program
      if (exitProgramCheck(inputIncorrectPlacePrompt)) return

      splitInput2 = splitStringBySpace(inputIncorrectPlacePrompt)
    }

    // move onto coordinates check
    let coordsFacing2 = splitStringByCommas(splitInput2[1])
    let coordsX2 = coordsFacing2[0]
    let coordsY2 = coordsFacing2[1]
    let facing2 = coordsFacing2[2]

    while (!fallOffBoardCheck(coordsX2, coordsY2)) {

      let inputPlaceIncorrectCoords = await fallOffTablePrompt()

      // exit program
      if (exitProgramCheck(inputPlaceIncorrectCoords)) return

      splitInput = splitStringBySpace(inputPlaceIncorrectCoords)
      if (splitInput[0] === 'PLACE') {
        coordsFacing2 = splitInput[1].split(',')
        coordsX2 = coordsFacing2[0]
        coordsY2 = coordsFacing2[1]
        facing2 = coordsFacing2[2]
      }
    }
  }
}

// checks if coordinates are within (0,0) and (5,5)
const fallOffBoardCheck = (coordsX, coordsY) => {
  if (-1 < coordsX && coordsX < 6) {
    if (-1 < coordsY && coordsY < 6) {
      return true
    }
  } else {
    return false
  }
}

// exit program check
const exitProgramCheck = (userInput) => {
  if (userInput === 'X') 
  return true
}

const splitStringByCommas = (string) => {
  let splitString = string.split(',')
  return splitString
}

const splitStringBySpace = (string) => {
  let splitString = string.split(' ')
  return splitString
}

const createCoordsFacingObject = (splitInput) => {
  let coordsFacing = {}
  coordsFacing.coordsX = splitInput[0]
  coordsFacing.coordsY = splitInput[1]
  coordsFacing.facing = splitInput[2]

  return coordsFacing
}

toyRobot()
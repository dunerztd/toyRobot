
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
        
    let splitInputPlaceCorrect = splitStringByCommas(splitInputInitialPlace[1])
    let coordsFacing = createCoordsFacingObject(splitInputPlaceCorrect)

    repeatFallOffTablePrompt(coordsFacing)
      
  // PLACE incorrect format
  } else {

    let splitInput2 = await repeatIncorrectPlacePrompt(splitInputInitialPlace)

    let splitInputIncorrectPlacePrompt = splitStringByCommas(splitInput2[1])
    let coordsFacing2 = createCoordsFacingObject(splitInputIncorrectPlacePrompt)

    repeatFallOffTablePrompt(coordsFacing2)
    
  }
}

// checks if coordinates are within (0,0) and (5,5)
const fallOffBoardCheck = (coordsFacing) => {
  if (-1 < coordsFacing.coordsX && coordsFacing.coordsX < 6) {
    if (-1 < coordsFacing.coordsY && coordsFacing.coordsY < 6) {
      return true
    }
  } else {
    return false
  }
}

// exit program check
// ** need to re-do this **
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

const repeatFallOffTablePrompt = async (coordsFacing) => {

  while (!fallOffBoardCheck(coordsFacing)) {

    let input = await fallOffTablePrompt()

    // exit program
    if (exitProgramCheck(input)) return

    let splitInputSpace = splitStringBySpace(input)
    if (splitInputSpace[0] === 'PLACE') {
            
      let splitInputCommas = splitStringByCommas(splitInputSpace[1])
      coordsFacing = createCoordsFacingObject(splitInputCommas)
    }
  }
}

const repeatIncorrectPlacePrompt = async (splitInput) => {

  while (splitInput[0] !== 'PLACE') {

    let input = await incorrectPlacePrompt()

    // exit program
    if (exitProgramCheck(input)) return

    splitInput = splitStringBySpace(input)
  }

  return splitInput
}

toyRobot()
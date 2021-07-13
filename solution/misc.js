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
  coordsFacing.coordsX = parseInt(splitInput[0])
  coordsFacing.coordsY = parseInt(splitInput[1])
  coordsFacing.facing = splitInput[2]

  return coordsFacing
}

const extractCoordsFacingFromPlaceCommand = async (splitInputSpace) => {
  let splitInputCommas = splitStringByCommas(splitInputSpace)
  let coordsFacing = createCoordsFacingObject(splitInputCommas)
  
  return coordsFacing
}

module.exports = {
  fallOffBoardCheck,
  exitProgramCheck,
  splitStringByCommas,
  splitStringBySpace,
  createCoordsFacingObject,
  extractCoordsFacingFromPlaceCommand
}
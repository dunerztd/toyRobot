const { inputPrompt } = require('./IO')

// checks if coordinates are within (0,0) and (5,5)
const onTableCheck = (coordsFacing) => {
  if (-1 < coordsFacing.coordsX && coordsFacing.coordsX < 6) {
    if (-1 < coordsFacing.coordsY && coordsFacing.coordsY < 6) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

const splitStringByCommas = (string) => {
  const splitString = string.split(',')
  return splitString
}

const splitStringBySpace = (string) => {
  const splitString = string.split(' ')
  return splitString
}

const createCoordsFacingObject = (splitInput) => {
  const coordsFacing = {}
  coordsFacing.coordsX = parseInt(splitInput[0])
  coordsFacing.coordsY = parseInt(splitInput[1])
  coordsFacing.facing = splitInput[2]

  return coordsFacing
}

// only used once a PLACE command has been entered correctly
const extractCoordsFacingFromPlaceCommand = async (splitInputSpace) => {
  const splitInputCommas = splitStringByCommas(splitInputSpace)
  const coordsFacing = createCoordsFacingObject(splitInputCommas)
  
  return coordsFacing
}

const inputAndSplitInputBySpace = async () => {
  const input = await inputPrompt()
  const inputSBS = splitStringBySpace(input)
  
  return inputSBS
}

module.exports = {
  onTableCheck,
  splitStringByCommas,
  splitStringBySpace,
  createCoordsFacingObject,
  extractCoordsFacingFromPlaceCommand,
  inputAndSplitInputBySpace
}
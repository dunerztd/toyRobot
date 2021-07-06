const {
  initialPlacePrompt,
  incorrectPlacePrompt,
  fallOffTablePrompt,
  repeatFallOffTablePrompt,
  repeatIncorrectPlacePrompt,
  onTablePrompt
} = require('./prompts')

const {
  fallOffBoardCheck,
  exitProgramCheck,
  splitStringByCommas,
  splitStringBySpace,
  createCoordsFacingObject
} = require('./misc')

const toyRobot = async () => {

  let inputInitialPlace = await initialPlacePrompt()
  
  // exit program
  if (exitProgramCheck(inputInitialPlace)) return

  let splitInputInitialPlace = splitStringBySpace(inputInitialPlace)
      
  // PLACE correct format
  if (splitInputInitialPlace[0] === 'PLACE' && splitInputInitialPlace[1] !== undefined) {

    let coordsFacing = await extractCoordsFacingFromPlaceCommand(splitInputInitialPlace[1])
    

  } else { // PLACE incorrect format

    let splitInput2 = await repeatIncorrectPlacePrompt(splitInputInitialPlace)

    let coordsFacing = await extractCoordsFacingFromPlaceCommand(splitInput2[1])

  }

  let onTableInput = await onTablePrompt()
  let onTableInputSplitBySpace = splitStringBySpace(onTableInput)
  main(onTableInputSplitBySpace[0], coordsFacing)
}

const extractCoordsFacingFromPlaceCommand = async (splitInputSpace) => {
  let splitInputCommas = splitStringByCommas(splitInputSpace)
  let coordsFacing = createCoordsFacingObject(splitInputCommas)
  let coordsFacingUpdate = await repeatFallOffTablePrompt(coordsFacing)

  return coordsFacingUpdate
}

const move = (coordsFacing) => {

  let coordsFacingOrig = {...coordsFacing}
  let coordsFacingMove = {...coordsFacing}

  switch(coordsFacing.facing) {
    case 'NORTH':
      coordsFacingMove.coordsY++
      break;
    case 'EAST':
      coordsFacingMove.coordsX++
      break;
    case 'SOUTH':
      coordsFacingMove.coordsY--
      break;
    case 'WEST':
      coordsFacingMove.coordsX--
      break;
  }

  if (fallOffBoardCheck(coordsFacingMove)) {
    return coordsFacingMove
  } else {
    console.log('Toy will fall off table. Move ignored');
    return coordsFacingOrig
  }
}

const left = (coordsFacing) => {

  let coordsFacingLeft = {...coordsFacing}

  switch(coordsFacing.facing) {
    case 'NORTH':
      coordsFacingLeft.facing = 'WEST'
      break;
    case 'EAST':
      coordsFacingLeft.facing = 'NORTH'
      break;
    case 'SOUTH':
      coordsFacingLeft.facing = 'EAST'
      break;
    case 'WEST':
      coordsFacingLeft.facing = 'SOUTH'
      break;
  }

  return coordsFacingLeft
}

const right = (coordsFacing) => {

  let coordsFacingRight = {...coordsFacing}

  switch(coordsFacing.facing) {
    case 'NORTH':
      coordsFacingRight.facing = 'EAST'
      break;
    case 'EAST':
      coordsFacingRight.facing = 'SOUTH'
      break;
    case 'SOUTH':
      coordsFacingRight.facing = 'WEST'
      break;
    case 'WEST':
      coordsFacingRight.facing = 'NORTH'
      break;
  }

  return coordsFacingRight
}

const report = (coordsFacing) => {
  console.log(`x: ${coordsFacing.coordsX}, y: ${coordsFacing.coordsY}, f: ${coordsFacing.facing}`)
}

const main = async (onTableInputSBS, coordsFacing) => {

  while (onTableInputSBS !== 'X') {

    switch(onTableInputSBS) {
      case 'MOVE':
        coordsFacing = move(coordsFacing)
        break;
      case 'LEFT':
        coordsFacing = left(coordsFacing)
        break;
      case 'RIGHT':
        coordsFacing = right(coordsFacing)
        break;
      case 'REPORT':
        report(coordsFacing)
        break;
      case 'PLACE':
        coordsFacing = await extractCoordsFacingFromPlaceCommand(onTableInputSBS)
        break;
      case 'X':
        return
      default:
        console.log('Command not recognised');
    }

    let mainInput = await onTablePrompt()
    onTableInputSBS = splitStringBySpace(mainInput)[0]
  }
}

toyRobot()
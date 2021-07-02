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
  if (splitInputInitialPlace[0] === 'PLACE') {

    let coordsFacing = await extractCoordsFacingFromPlaceCommand(splitInputInitialPlace[1])
    let onTableInput = await onTablePrompt()

    mainMenu(onTableInput, coordsFacing)

  } else { // PLACE incorrect format

    let splitInput2 = await repeatIncorrectPlacePrompt(splitInputInitialPlace)
    let coordsFacing = extractCoordsFacingFromPlaceCommand(splitInput2[1])
  }
}


const extractCoordsFacingFromPlaceCommand = async (splitInputSpace) => {
  let splitInputCommas = splitStringByCommas(splitInputSpace)
  let coordsFacing = createCoordsFacingObject(splitInputCommas)
  repeatFallOffTablePrompt(coordsFacing)

  return coordsFacing
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

  if (fallOffBoardCheck(coordsFacing)) {
    return coordsFacingMove
  } else {
    return coordsFacingOrig
  }
}

const left = (coordsFacing) => {
  switch(coordsFacing.facing) {
    case 'NORTH':
      coordsFacing.facing = 'WEST'
      break;
    case 'EAST':
      coordsFacing.facing = 'NORTH'
      break;
    case 'SOUTH':
      coordsFacing.facing = 'EAST'
      break;
    case 'WEST':
      coordsFacing.facing = 'SOUTH'
      break;
  }

  return coordsFacing
}

const right = (coordsFacing) => {
  switch(coordsFacing.facing) {
    case 'NORTH':
      coordsFacing.facing = 'EAST'
      break;
    case 'EAST':
      coordsFacing.facing = 'SOUTH'
      break;
    case 'SOUTH':
      coordsFacing.facing = 'WEST'
      break;
    case 'WEST':
      coordsFacing.facing = 'NORTH'
      break;
  }

  return coordsFacing
}

const report = (coordsFacing) => {
  console.log(`x: ${coordsFacing.coordsX}, y: ${coordsFacing.coordsY} f: ${coordsFacing.facing}`)
}

const mainMenu = async (onTableInput, coordsFacing) => {

  while (onTableInput !== 'X') {

    switch(onTableInput) {
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
      case 'X':
        return
      default:
        console.log('Command not recognised');
    }

    console.log(coordsFacing);

    onTableInput = await onTablePrompt()
  }
}

toyRobot()
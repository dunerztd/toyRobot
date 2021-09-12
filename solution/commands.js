const {
  onTableCheck,
  extractCoordsFacingFromPlaceCommand
} = require('./misc')

const {
  moveToyOffTablePrompt,
  placeIncorrectFormatPrompt,
  placeToyFallOffTablePrompt,
  toyOnTablePrompt
} = require('./IO')

const move = (coordsFacing) => {

  const coordsFacingOrig = {...coordsFacing}
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

  if (onTableCheck(coordsFacingMove)) {
    return coordsFacingMove
  } else {
    moveToyOffTablePrompt()
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

const place = async (onTableInputSBS, coordsFacing) => {

  if (onTableInputSBS[1] === undefined) {
    placeIncorrectFormatPrompt()
    return coordsFacing
  }

  const coordsFacingNew = await extractCoordsFacingFromPlaceCommand(onTableInputSBS[1])

  if (!onTableCheck(coordsFacingNew)) {
    placeToyFallOffTablePrompt()
    return coordsFacing
  }

  toyOnTablePrompt()
  return coordsFacingNew
}

module.exports = {
  move,
  left,
  right,
  report,
  place
}
const {
  fallOffBoardCheck,
  extractCoordsFacingFromPlaceCommand
} = require('./misc')

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

const place = async (onTableInputSBS, coordsFacing) => {

  if (onTableInputSBS[1] !== undefined) {
    let coordsFacingNew = await extractCoordsFacingFromPlaceCommand(onTableInputSBS[1])
    if (fallOffBoardCheck(coordsFacingNew)) {
      return coordsFacingNew
    } else {
      console.log('Toy Robot will fall off table. Make sure coordinates within (0,0) and (5,5)');
      return coordsFacing
    }
  } else {
    console.log('Incorrect PLACE format');
    return coordsFacing
  }
}

module.exports = {
  move,
  left,
  right,
  report,
  place
}
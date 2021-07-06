var prompt = require('prompt');

const { 
  fallOffBoardCheck,
  exitProgramCheck,
  splitStringByCommas,
  splitStringBySpace,
  createCoordsFacingObject
} = require('./misc')

const initialPlacePrompt = async () => {
  
  prompt.start();

  // first user input
  const { input } = await prompt.get({
    description: "To start Toy Robot, type 'PLACE' followed by X,Y co-ordinates and Facing direction in the format of 'PLACE X,Y,F' or type 'X' to Exit",
    name: 'input'
  })

  return input
}

const incorrectPlacePrompt = async () => {
  
  const { input } = await prompt.get({
    name: 'input',
    description: "Error. To start Toy Robot, type 'PLACE' followed by X,Y co-ordinates and Facing direction in the format of 'PLACE X,Y,F' or type 'X' to Exit"
  })

  return input
}

const fallOffTablePrompt = async () => {

  const { input } = await prompt.get({
    description: "Toy Robot will fall off table. Make sure coordinates within (0,0) and (5,5)",
    name: 'input'
  })

  return input
}

const repeatFallOffTablePrompt = async (coordsFacing) => {
  

  while (!fallOffBoardCheck(coordsFacing)) {

    let input = await fallOffTablePrompt()

    // exit program
    if (exitProgramCheck(input)) return

    let splitInputSpace = splitStringBySpace(input)
    if (splitInputSpace[0] === 'PLACE' && splitInputSpace[1] !== undefined) {
            
      let splitInputCommas = splitStringByCommas(splitInputSpace[1])
      coordsFacing = createCoordsFacingObject(splitInputCommas)
    }
  }

  return coordsFacing
}

const repeatIncorrectPlacePrompt = async (splitInput) => {

  while (splitInput[0] !== 'PLACE' || splitInput[1] === undefined) {

    let input = await incorrectPlacePrompt()

    // exit program
    if (exitProgramCheck(input)) return

    splitInput = splitStringBySpace(input)
  }

  return splitInput
}

const onTablePrompt = async () => {
  
  prompt.start();

  // first user input
  const { input } = await prompt.get({
    description: ">>",
    name: 'input'
  })

  return input
}

module.exports = {
  initialPlacePrompt,
  incorrectPlacePrompt,
  fallOffTablePrompt,
  repeatFallOffTablePrompt,
  repeatIncorrectPlacePrompt,
  onTablePrompt
}
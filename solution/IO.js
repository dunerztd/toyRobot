var prompt = require('prompt');

// all prompts console.log the description and return the user's input
const initialPlacePrompt = () => console.log("To start Toy Robot, type 'PLACE' followed by X,Y co-ordinates and Facing direction in the format of 'PLACE X,Y,F' or type 'X' to Exit");

const incorrectPlacePrompt = () => console.log("Error. To start Toy Robot, type 'PLACE' followed by X,Y co-ordinates and Facing direction in the format of 'PLACE X,Y,F' or type 'X' to Exit")

const moveToyOffTablePrompt = () => console.log('Toy will fall off table. Move ignored');

const placeIncorrectFormatPrompt = () => console.log('Incorrect PLACE format');

const placeToyFallOffTablePrompt = () => console.log('Toy Robot will fall off table. Make sure coordinates within (0,0) and (5,5)');

const toyOnTablePrompt = () => console.log('Toy Robot on table')

const inputPrompt = async () => {
  
  prompt.start();

  const { input } = await prompt.get({
    description: ">>",
    name: 'input'
  })

  return input
}

module.exports = {
  initialPlacePrompt,
  incorrectPlacePrompt,
  inputPrompt,
  moveToyOffTablePrompt,
  placeIncorrectFormatPrompt,
  placeToyFallOffTablePrompt,
  toyOnTablePrompt
}
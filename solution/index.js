const {
  initialPlacePrompt,
  incorrectPlacePrompt
} = require('./IO')

const {
  onTableCheck,
  inputAndSplitInputBySpace,
} = require('./misc')

const {
  move,
  left,
  right,
  report,
  place
} = require('./commands')

const toyRobot = async () => {

  let coordsFacing = {}
  let splitInputInitialPlace = ''

  initialPlacePrompt()
      
  while (true) {

    splitInputInitialPlace = await inputAndSplitInputBySpace()
    
    switch(splitInputInitialPlace[0]) {
      case 'X':
        return
      case 'PLACE':
        coordsFacing = await place(splitInputInitialPlace, coordsFacing)
        break;
      default:
        incorrectPlacePrompt()
    }

    if (onTableCheck(coordsFacing)) {
      break;
    }
  }

  const onTableInputSplitBySpace = await inputAndSplitInputBySpace()
  main(onTableInputSplitBySpace, coordsFacing)
}

const main = async (onTableInputSBS, coordsFacing) => {

  while (onTableInputSBS[0] !== 'X') {

    switch(onTableInputSBS[0]) {
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
        coordsFacing = await place(onTableInputSBS, coordsFacing)
        break;
      case 'X':
        return
      default:
        console.log('Command not recognised');
    }

    onTableInputSBS = await inputAndSplitInputBySpace()
  }
}

toyRobot().catch((e) => console.log(e))

module.exports = {
  toyRobot,
  main
}
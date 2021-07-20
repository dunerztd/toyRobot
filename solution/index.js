const {
  initialPlacePrompt,
  incorrectPlacePrompt,
  fallOffTablePrompt,
  onTablePrompt
} = require('./prompts')

const {
  onTableCheck,
  exitProgramCheck,
  splitStringBySpace,
  extractCoordsFacingFromPlaceCommand
} = require('./misc')

const {
  move,
  left,
  right,
  report,
  place
} = require('./commands')

const toyRobot = async () => {

  const inputInitialPlace = await initialPlacePrompt()
  let splitInputInitialPlace = splitStringBySpace(inputInitialPlace)

  let coordsFacing = {}
      
  while (true) {

    // exit program
    if (exitProgramCheck(splitInputInitialPlace[0])) return

    if (splitInputInitialPlace[0] !== 'PLACE' || splitInputInitialPlace[1] === undefined) {
      let input2 = await incorrectPlacePrompt()
      splitInputInitialPlace = splitStringBySpace(input2)
    }

    if (splitInputInitialPlace[0] === 'PLACE' && splitInputInitialPlace[1] !== undefined) {
      coordsFacing = await extractCoordsFacingFromPlaceCommand(splitInputInitialPlace[1])
    }
      
    if (onTableCheck(coordsFacing)) {
      console.log('Toy Robot on table')
      break
    }

    if (splitInputInitialPlace[0] === 'PLACE' && splitInputInitialPlace[1] !== undefined) {
      let input = await fallOffTablePrompt()
      splitInputInitialPlace = splitStringBySpace(input)
    }
  }

  const onTableInput = await onTablePrompt()
  const onTableInputSplitBySpace = splitStringBySpace(onTableInput)
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

    let mainInput = await onTablePrompt()
    onTableInputSBS = splitStringBySpace(mainInput)
  }
}

toyRobot().catch((e) => console.log(e))
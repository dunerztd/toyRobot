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

  // exit program
  if (exitProgramCheck(inputInitialPlace)) return

  let coordsFacing = {}
      
  // PLACE correct format
  while (!onTableCheck(coordsFacing)) {
    
    if (splitInputInitialPlace[0] === 'PLACE' && splitInputInitialPlace[1] !== undefined) {

      coordsFacing = await extractCoordsFacingFromPlaceCommand(splitInputInitialPlace[1])

      if (!onTableCheck(coordsFacing)) {

        let input = await fallOffTablePrompt()
        let loopSplitBySpace = splitStringBySpace(input)

        if (exitProgramCheck(input)) return

        if (loopSplitBySpace[0] === 'PLACE') {
          coordsFacing = await extractCoordsFacingFromPlaceCommand(loopSplitBySpace[1])
        } else {
          let input2 = await incorrectPlacePrompt()
          splitInputInitialPlace = splitStringBySpace(input2)
        }
      }
      
    } else { // PLACE incorrect format

      let input3 = await incorrectPlacePrompt()
      splitInputInitialPlace = splitStringBySpace(input3)

      if (exitProgramCheck(input3)) return

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

toyRobot()
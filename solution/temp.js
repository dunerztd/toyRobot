while (!fallOffBoardCheck(coordsFacing)) {
    
    if (splitInputInitialPlace[0] === 'PLACE' && splitInputInitialPlace[1] !== undefined) {

      coordsFacing = await extractCoordsFacingFromPlaceCommand(splitInputInitialPlace[1])

      if (!fallOffBoardCheck(coordsFacing)) {

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
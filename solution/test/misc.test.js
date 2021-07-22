const {
  onTableCheck,
  exitProgramCheck,
  splitStringByCommas,
  splitStringBySpace,
  createCoordsFacingObject,
  extractCoordsFacingFromPlaceCommand
} = require('../misc')

// Arrange-Act-Assert

describe("onTableCheck function", () => {

  test("Co-ordinates (2,2) should return true", () => {
    const coordsFacing = {coordsX: 2, coordsY: 2}

    const result = onTableCheck(coordsFacing)

    expect(result).toBe(true)
  })

  test("Co-ordinates (7,8) should return false", () => {

    const coordsFacing = { coordsX: 7, coordsY: 8 }

    const result = onTableCheck(coordsFacing)

    expect(result).toBe(false)
  })

  test("Co-ordinates (4,9) should return false", () => {

    const coordsFacing = { coordsX: 4, coordsY: 9 }

    const result = onTableCheck(coordsFacing)

    expect(result).toBe(false)
  })

  test("Co-ordinates (-5,-1) should return false", () => {

    const coordsFacing = { coordsX: -5, coordsY: -1 }

    const result = onTableCheck(coordsFacing)

    expect(result).toBe(false)
  })

  test("Co-ordinates (2,-1) should return false", () => {

    const coordsFacing = { coordsX: 2, coordsY: -1 }

    const result = onTableCheck(coordsFacing)

    expect(result).toBe(false)
  })
})

describe("exitProgramCheck function", () => {

  test("An input of 'X' should return true", () => {
    const input = 'X'

    const result = exitProgramCheck(input)

    expect(result).toBe(true)
  })

  test("An input of 'PLACE' should return undefined", () => {
    const input = 'PLACE'

    const result = exitProgramCheck(input)

    expect(result).toBe(undefined)
  })
})

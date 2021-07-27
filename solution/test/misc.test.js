const {
  onTableCheck,
  exitProgramCheck,
  splitStringByCommas,
  splitStringBySpace,
  createCoordsFacingObject,
  extractCoordsFacingFromPlaceCommand
} = require('../misc')

// Arrange-Act-Assert
// inputs, valid and invalid
// look for errors

describe("onTableCheck function", () => {

  test("Input a string instead of a object, should return false", () => {
    const coordsFacing = 'hello'

    const result = onTableCheck(coordsFacing)

    expect(result).toBe(false)
  })

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

  test("An input of an array of numbers should return undefined", () => {
    const input = [1,2,3]

    const result = exitProgramCheck(input)

    expect(result).toBe(undefined)
  })
})

describe("splitStringByCommas function", () => {

  test("An input of 'hello,yeah,hello' should return An Array of ['hello', 'yeah', 'hello']", () => {
    const input = 'hello,yeah,hello'

    const result = splitStringByCommas(input)

    expect(result).toBeInstanceOf(Array)
    expect(result).toEqual(['hello', 'yeah', 'hello'])
  })

  test("An input of Boolean, Array, Number should throw a TypeError", () => {
    
    const input = true
    expect(() => {splitStringByCommas(input)}).toThrow(TypeError)

    const input2 = ['hello', 'world']
    expect(() => {splitStringByCommas(input2)}).toThrow(TypeError)

    const input3 = 23
    expect(() => {splitStringByCommas(input3)}).toThrow(TypeError)
  })
})

describe("splitStringBySpace function", () => {
  test("An input of 'hello world' should return ['hello', 'world']", () => {
    const input = 'hello world'

    const result = splitStringBySpace(input)

    expect(result).toEqual(['hello', 'world'])
  })
})

describe("createCoordsFacingObject function", () => {
  test("should create an object with X,Y coordinates and Facing string out of a given array", () => {
    const input = [5,5,'NORTH']

    const result = createCoordsFacingObject(input)

    expect(result).toBeInstanceOf(Object)
    expect(result.coordsX).toEqual(5)
    expect(result.coordsY).toEqual(5)
    expect(result.facing).toEqual('NORTH')
  })
})

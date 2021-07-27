const {
  move,
  left,
  right,
  report,
  place
} = require('../commands')

describe("move function", () => {
  test("coordsFacing(5,5,SOUTH) should return coordsFacing(4,5,SOUTH)", () => {
    const coordsFacing = { coordsX: 5, coordsY: 5, facing: 'SOUTH'}

    const result = move(coordsFacing)

    expect(result).toEqual({ coordsX: 5, coordsY: 4, facing: 'SOUTH'})
  })

  test("coordsFacing(5,5,NORTH) should return coordsFacing unchanged", () => {
    const coordsFacing = { coordsX: 5, coordsY: 5, facing: 'NORTH'}

    const result = move(coordsFacing)

    expect(result).toEqual({ coordsX: 5, coordsY: 5, facing: 'NORTH'})
  })
})

describe("left function", () => {
  test("coordsFacing(3,3,SOUTH) should return coordsFacing(3,3,EAST)", () => {
    const coordsFacing = { coordsX: 3, coordsY: 3, facing: 'SOUTH'}

    const result = left(coordsFacing)

    expect(result).toEqual({ coordsX: 3, coordsY: 3, facing: 'EAST' })
  })
})

describe("right function", () => {
  test("coordsFacing(1,3,NORTH) should return coordsFacing(1,3,EAST)", () => {
    const coordsFacing = { coordsX: 1, coordsY: 3, facing: 'NORTH'}

    const result = right(coordsFacing)

    expect(result).toEqual({ coordsX: 1, coordsY: 3, facing: 'EAST' })
  })
})


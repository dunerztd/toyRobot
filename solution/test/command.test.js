// npm test -f command -- -t=yap

const {
  move,
  left,
  right,
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

describe("place function", () => {
  test("PLACE command not followed by a space should return coordsFacing unchanged", () => {

    const onTableInputSBS = ['PLACE4,4,NORTH']
    let coordsFacing = { coordsX: 1, coordsY: 1, facing: 'NORTH'}

    return place(onTableInputSBS, coordsFacing).then(result => {
      expect(result).toEqual({ coordsX: 1, coordsY: 1, facing: 'NORTH'})
    })
  })

  test("PLACE command in the correct format but with coordinates outside (0,0) and (5,5) should return coordsFacing unchanged", async () => {

    const onTableInputSBS = ['PLACE', '7,4,EAST']
    let coordsFacing = { coordsX: 7, coordsY: 4, facing: 'EAST'}

    const result = await place(onTableInputSBS,coordsFacing)

    expect(result).toEqual({ coordsX: 7, coordsY: 4, facing: 'EAST'})
  })

  test("PLACE command in the correct format and coordinates inside (0,0) and (5,5) should return coordsFacing updated", async () => {

    const onTableInputSBS = ['PLACE', '3,3,NORTH']
    let coordsFacing = { coordsX: 1, coordsY: 5, facing: 'EAST'}

    const result = await place(onTableInputSBS,coordsFacing)

    expect(result).toEqual({ coordsX: 3, coordsY: 3, facing: 'NORTH'})
  })

  test("PLACE command in the correct format but with invalid coordinates and facing input, should return coordsFacing unchanged", async () => {

    const onTableInputSBS = ['PLACE', '55,NHROjf']
    let coordsFacing = { coordsX: 4, coordsY: 4, facing: 'WEST'}

    const result = await place(onTableInputSBS,coordsFacing)

    expect(result).toEqual({ coordsX: 4, coordsY: 4, facing: 'WEST'})
  })

  test("PLACE command in the correct format but with invalid coordinates and facing input, should return coordsFacing unchanged", async () => {

    const onTableInputSBS = ['PLACE', 'foo foo bar']
    let coordsFacing = { coordsX: 1, coordsY: 2, facing: 'SOUTH'}

    const result = await place(onTableInputSBS,coordsFacing)

    expect(result).toEqual({ coordsX: 1, coordsY: 2, facing: 'SOUTH'})
  })
})
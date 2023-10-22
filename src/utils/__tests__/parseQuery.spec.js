const { expect } = require('chai')
const { default: parseQuery } = require('../parseQuery')

describe('parseQuery()', () => {
  it('should return mes & anio as number', () => {
    const input = {
      mes: '10',
      anio: '2023'
    }
    const output = parseQuery(input)
    expect(typeof output.mes).to.equal('number')
    expect(typeof output.anio).to.equal('number')
  })
})

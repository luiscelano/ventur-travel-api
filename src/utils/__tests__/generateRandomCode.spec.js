import { assert } from 'chai'
import generateRandomCode from 'utils/generateRandomCode'

describe('generateRandomCode()', () => {
  it('randomCode should be type of string', () => {
    const randomCode = generateRandomCode()
    assert.equal(typeof randomCode, 'string')
  })
  it('randomCode length should be 120', () => {
    const randomCode = generateRandomCode()
    assert.equal(randomCode.length, 20)
  })
})

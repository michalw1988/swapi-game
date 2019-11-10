import { getRandomPairNumbers, getRandomInt } from './helpers'

describe('Getting pair of number', () => {
  it('returns pair of number', () => {
    const pairOfNumbers = getRandomPairNumbers(10)
    expect(pairOfNumbers).toHaveLength(2)
  });

  it('returns numbers leower or equal to maximum', () => {
    const max = 3
    const pairOfNumbers = getRandomPairNumbers(max)
    expect(pairOfNumbers[0]).toBeLessThanOrEqual(max)
    expect(pairOfNumbers[1]).toBeLessThanOrEqual(max)
  });

  it('returns different numbers', () => {
    const pairOfNumbers = getRandomPairNumbers(2)
    expect(pairOfNumbers[0]).not.toEqual(pairOfNumbers[1])
  });
})

describe('Getting ineger value from given range', () => {
  it('returns number in given range', () => {
    const randomNumber = getRandomInt(1, 3)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(3)
  });

  it('returns number in given range', () => {
    const randomNumber = getRandomInt(10, 10)
    expect(randomNumber).toEqual(10)
  });

  it('returns integer value', () => {
    const randomNumber = getRandomInt(0, 10)
    expect(Number.isInteger(randomNumber)).toEqual(true)
  });
})
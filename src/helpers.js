const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomPairNumbers = totalCount => {
  const firstNumber = getRandomInt(1, totalCount)
  let secondNumber = getRandomInt(1, totalCount)
  while (firstNumber === secondNumber) secondNumber = getRandomInt(1, totalCount)
  return [firstNumber, secondNumber]
}

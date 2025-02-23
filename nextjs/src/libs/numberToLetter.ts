export const numberToLetter = (number: number) => {
  if (number < 1 || number > 26) {
    return 'Number out of range'
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

  return alphabet[number - 1]
}

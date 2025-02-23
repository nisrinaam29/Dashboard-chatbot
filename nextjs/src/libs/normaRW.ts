export const normaRW = (number: number) => {
  const modNumber = number % 10
  const divNumber = Math.round(number / 10)

  let result = 0

  if (modNumber >= 5) {
    result = divNumber * 10
  } else if (modNumber > 0) {
    result = divNumber * 10 + 10
  }

  return result
}

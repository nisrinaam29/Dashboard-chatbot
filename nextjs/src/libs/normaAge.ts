export const normaAge = (number: number) => {
  let result = 0

  const modNumber = number % 10
  const divNumber = Math.round(number / 10)

  if (number < 19) {
    result = number
  } else if (number >= 19 && number <= 20) {
    result = 20
  } else if(number > 50 && number<=60) {
    result = 60
  } else {
    if (modNumber > 5) {
      result = divNumber * 10 + 10
    } else {
      result = divNumber * 10 + 5
    }
  }

  return result
}

export const timeDifference = (start: Date, finish: string) => {
  // Convert the string representations of the times to Date objects
  const startTime = new Date(start)
  const finishTime = new Date(finish)

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = Number(finishTime) - Number(startTime)

  // Convert milliseconds to seconds, minutes, and hours
  const seconds = Math.floor(timeDifferenceMs / 1000)

  // Output the time difference
  return seconds
}

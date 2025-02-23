export const generateTime = () => {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return 'pagi'
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'siang'
  } else {
    return 'malam'
  }
}

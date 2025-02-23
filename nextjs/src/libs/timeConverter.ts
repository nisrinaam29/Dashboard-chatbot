export const timeConverter = (time: string) => {
  const parts = time.split('-')

  const rearrangedDateString = parts[2] + '-' + parts[1] + '-' + parts[0]

  return rearrangedDateString
}

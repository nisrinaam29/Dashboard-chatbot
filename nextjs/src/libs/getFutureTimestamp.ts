export const getFutureTimestamp = (seconds:number) => {
  const currentTimeStamp = new Date().getTime()

  const futureTimeStamp = currentTimeStamp + seconds * 1000

  return { currentTimeStamp: new Date(currentTimeStamp), futureTimeStamp: new Date(futureTimeStamp) }
}

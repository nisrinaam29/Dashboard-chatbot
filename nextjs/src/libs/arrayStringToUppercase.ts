export const arrayStringToUppercase = (array: string[]) => {
  if (array != null) {
    const uppercaseArray = array.map((item: string) => item.toUpperCase())

    return uppercaseArray
  }
}

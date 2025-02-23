export const sortedResults = results => {
  const order = 'GALPITVXSBORDCZEKFWN'

  return results.slice().sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label))
}

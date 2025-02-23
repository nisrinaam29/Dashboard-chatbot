const array = [];

for (let i = 1; i <= 10; i++) {
  if (i == 10) {
    array.push(0)
  } else {
    array.push(i)
  }
}


export const answerType: {
  NUMBER: number[]
  DOUBLE: string[]
  MULTIPLE_IMAGE: string[]
} = {
  NUMBER: array,
  DOUBLE: ['1', '2'],
  MULTIPLE_IMAGE: ['a', 'b', 'c', 'd', 'e']
}



export const answerChara = {
  '1': 'A',
  '2': 'B'
}

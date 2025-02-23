export const corakBerfikir = (value4, value6, value3, value7) => {
  let result

  if (value4 + value6 > value3 + value7) {
    result = 'FESTIGUNG'
  } else {
    result = 'FLEKSIBILITAT'
  }

  return result
}

export const caraBerfikir = (value1, value2, value3, value4) => {
  let result

  if (value1 < value2 && value2 > value3 && value3 < value4) {
    result = 'VERBAL - TEORITIS'
  } else if (value1 > value2 && value2 < value3 && value3 > value4) {
    result = 'KONKRIT-PRAKTIS'
  } else {
    result = 'N/A'
  }

  return result
}

export const komprehensiBerfikir = (value8, value4) => {
  return (value8 + value4) / 2
}

export const decisionMakingSkill = (value1, value3, value6, value7, value9) => {
  return (value1 + value3 + value6 + value7 + value9) / 5
}

export const verbalSkill = (value2, value4) => {
  return (value2 + value4) / 2
}

export const arithmeticSkill = (value6, value7) => {
  return (value6 + value7) / 2
}

import type { AnswerTypes } from '@/types/AnswerTypes'
import NormaEPPS from '../models/NormaEPPS'
import type { UserTypes } from '@/types/UserTypes'
import type { ArrParent, ResultEPPSTypes } from '@/types/ResultEPPSTypes'
import type { TypeAnswerInterface } from '@/interfaces/interfaceResults'
import { labelsEPPS, typeAnswer } from '@/constants/dataEPPS'
import NormaAngka from '../models/NormaAngka'

export const getResultEPPS = async (answers: AnswerTypes, user: UserTypes) => {
  function chunkArray(array: any, size: number) {
    const chunkedArr = []

    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size))
    }

    return chunkedArr
  }

  function transpose(array: any) {
    return array[0].map((col: string, i: number) => array.map((row: string[]) => row[i]))
  }

  const compareArrays = (array1: string[], array2: string[]) => {
    if (array1.length !== array2.length) {
      return 'X'
    }

    const result = []

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] === array2[i]) {
        result.push('OK')
      } else {
        result.push('X')
      }
    }

    return result
  }

  const getArrayAnswer = (array: ArrParent[]) => {
    const arrResult = []

    for (let i = 0; i < 5; i++) {
      arrResult.push(array[i][i].answer)
    }

    return arrResult
  }

  // Array Anda dengan panjang 225
  const originalArray = answers

  // Memecah array menjadi 9 bagian
  const dividedInto9 = chunkArray(originalArray, 25)
  const dividedInto5: any[] = dividedInto9.map(item => chunkArray(item, 5))
  const dividedInto5Transposed = dividedInto9.map(item => transpose(chunkArray(item, 5)))

  const firstArrCheck = compareArrays(getArrayAnswer(dividedInto5[0]), getArrayAnswer(dividedInto5[6]))
  const secondArrCheck = compareArrays(getArrayAnswer(dividedInto5[1]), getArrayAnswer(dividedInto5[4]))
  const thirdArrCheck = compareArrays(getArrayAnswer(dividedInto5[2]), getArrayAnswer(dividedInto5[8]))

  const combinedCheck = [firstArrCheck, secondArrCheck, thirdArrCheck]

  // Get Result R
  const combinedArray = (array1: any, array2: any, array3: any) => {
    const combinedArray = []

    for (let i = 0; i < array1.length; i++) {
      combinedArray.push([...array1[i], ...array2[i], ...array3[i]])
    }

    return combinedArray
  }

  const getArrayHorizontal = (values: ArrParent[]) => {
    const arrCombined: any = []

    values.forEach((element: AnswerTypes[]) => {
      const arr: string[] = []

      element.forEach(item => {
        arr.push(item.answer)
      })

      arrCombined.push(arr)
    })

    return arrCombined
  }

  const getCountResult = (values: ArrParent, type: string) => {
    const results = []

    if (type == 'HORIZONTAL') {
      for (let i = 0; i < values.length; i += 3) {
        const array = combinedArray(values[i], values[i + 1], values[i + 2])
        const horizontalArray = getArrayHorizontal(array)

        results.push(...horizontalArray)
      }
    } else if (type == 'VERTICAL') {
      for (let i = 0; i < 3; i++) {
        const array = combinedArray(dividedInto5[i], dividedInto5[i + 3], dividedInto5[i + 6])
        const horizontalArray = getArrayHorizontal(array)

        results.push(...horizontalArray)
      }
    }

    const finalResult: number[] = []

    results.forEach((result, index) => {
      let count = 0

      result.forEach((item: number, indexItem: number) => {
        if (index != indexItem) {
          if (item == typeAnswer[type as keyof TypeAnswerInterface]) {
            count += 1
          }
        }
      })
      finalResult.push(count)
    })

    return finalResult
  }

  const getSumResult = (array1: number[], array2: number[]) => {
    const result: number[] = []

    array1.forEach((item, index) => {
      const sum = item + array2[index]

      result.push(sum)
    })

    return result
  }

  const getNormaEPPS = async (sResult: number[]) => {
    const arrResultNorma: any = []

    // Make the arrow function inside forEach async
    await Promise.all(
      sResult.map(async (item: number, index: number) => {
        // Use await inside the async arrow function
        const resultNorma: any = await NormaEPPS.findOne({
          where: {
            type: labelsEPPS[index].toLowerCase(),
            gender: user?.gender?.toUpperCase(),
            score: item
          }
        })!

        arrResultNorma.push(resultNorma?.norma)
      })
    )

    return arrResultNorma
  }

  const getNormaAngka = async (sResult: number[]) => {
    const arrResultNorma: any = []

    // Make the arrow function inside forEach async
    await Promise.all(
      sResult.map(async (item: number, index: number) => {
        // Use await inside the async arrow function
        const resultNorma: any = await NormaAngka.findOne({
          where: {
            type: labelsEPPS[index].toLowerCase(),
            score: item
          }
        })!

        arrResultNorma.push(resultNorma?.norma)
      })
    )

    return arrResultNorma
  }

  const rResult = getCountResult(dividedInto5Transposed, 'HORIZONTAL')
  const cResult = getCountResult(dividedInto5, 'VERTICAL')
  const sResult = getSumResult(rResult, cResult)
  const intraResult = await getNormaEPPS(sResult)
  const interResult = await getNormaAngka(sResult)
  const conResult = [...combinedCheck[0], ...combinedCheck[1], ...combinedCheck[2]]

  const combineResults: ResultEPPSTypes[] = []

  labelsEPPS.forEach((label, index) => {
    let res = {
      n: '',
      r: 0,
      c: 0,
      s: 0,
      intra: 0,
      inter: 0,
      p: 0,
      con: ''
    }

    if (index == combineResults.length - 1) {
      res = {
        ...res,
        n: label,
        r: conResult.filter(item => item == 'OK').length,
        s: sResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      }
    } else {
      res = {
        ...res,
        n: label,
        r: rResult[index],
        c: cResult[index],
        s: sResult[index],
        intra: intraResult[index],
        inter: interResult[index],
        con: conResult[index]
      }
    }

    combineResults.push(res)
  })

  const dataResults = {
    results: dividedInto5Transposed,
    combineResults: chunkArray(combineResults, 5),
    checks: combinedCheck
  }

  return dataResults
}

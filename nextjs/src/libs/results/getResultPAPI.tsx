import type { AnswerTypes } from '@/types/AnswerTypes'
import type { UserTypes } from '@/types/UserTypes'
import NormaPAPI from '../models/NormaPAPI'
import PAPIDescription from '../models/PAPIDescription'

type ResultsPAPITypes = {
  label: string
  count: number
  description: string
}

const labels = ['A', 'N', 'G', 'C', 'D', 'R', 'T', 'V', 'W', 'F', 'L', 'P', 'I', 'S', 'B', 'O', 'X', 'E', 'K', 'Z']
const counts = [7, 4, 4, 3, 2, 8, 5, 0, 1, 3, 8, 7, 6, 4, 3, 2, 7, 5, 4, 7]

const descriptions = [
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description',
  'Test Description'
]

export const getResultPAPI = async (answers: AnswerTypes[], user: UserTypes) => {
  const processAnswers = async answers => {
    const arrCount = []

    for (const element of answers) {
      const result = await NormaPAPI.findOne({
        where: {
          question_number: element.question_number,
          answer: element.answer
        }
      })

      if (result) {
        arrCount.push(result?.norma)
      }
    }

    return arrCount
  }

  const processDescription = async (norma, score) => {
    const result = await PAPIDescription.findOne({
      where: {
        norma: norma,
        score: score
      }
    })

    return result?.description || ''
  }

  const arrCounts = await processAnswers(answers)

  const countGroups = arrCounts.reduce((acc, element) => {
    acc[element] = (acc[element] || 0) + 1

    return acc
  }, {})

  const results = await Promise.all(
    labels.map(async element => {
      const count = countGroups[element] || 0
      const description = await processDescription(element, count)

      return {
        label: element,
        count: count,
        description: description
      }
    })
  )

  return { results }
}

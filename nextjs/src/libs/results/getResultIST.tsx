import { labelTotal } from '@/constants/labelTotal'
import { arrayStringToUppercase } from '../arrayStringToUppercase'
import { calculateAge } from '../calculateAge'
import IQ from '../models/IQ'
import NormaGE from '../models/NormaGE'
import NormaGESAMT from '../models/NormaGESAMT'
import NormaSW from '../models/NormaSW'
import { normaAge } from '../normaAge'
import { normaRW } from '../normaRW'
import type { AnswerTypes } from '@/types/AnswerTypes'
import type { UserTypes } from '@/types/UserTypes'
import type { GroupedAnswers, LabelTotalInterface, ResultsSW, Scores } from '@/interfaces/interfaceResults'
import { resultCategory } from '../resultCategory'
import {
  arithmeticSkill,
  caraBerfikir,
  corakBerfikir,
  decisionMakingSkill,
  komprehensiBerfikir,
  verbalSkill
} from '../generateCognitive'

export const getResultIST = async (answers: AnswerTypes[], user: UserTypes) => {
  const age = normaAge(calculateAge(user?.birth_date, user?.inspection_date))
  const groupedAnswers: GroupedAnswers = {}
  const scores: Scores = {}
  const resultsSW: ResultsSW = {}

  answers.forEach((answer: AnswerTypes) => {
    if (!groupedAnswers[answer.category_id]) {
      groupedAnswers[answer.category_id] = []
    }

    groupedAnswers[answer.category_id].push(answer)
  })

  const processGroup = async (label: string, scores: Scores, groupedAnswers: GroupedAnswers) => {
    if (!scores[label]) {
      scores[label] = 0
    }

    groupedAnswers[label].forEach((item: AnswerTypes) => {
      const keys_1 = item?.Question?.key_1?.split('|') || []
      const keys_2 = item?.Question?.key_2?.split('|') || []
      const keys_3 = item?.Question?.key_3?.split('|') || []

      if (arrayStringToUppercase(keys_1)?.includes(item.answer.toUpperCase())) {
        scores[label] += 2
      } else if (arrayStringToUppercase(keys_2)?.includes(item.answer.toUpperCase())) {
        scores[label] += 1
      } else if (arrayStringToUppercase(keys_3)?.includes(item.answer.toUpperCase())) {
        scores[label] += 0
      } else {
        scores[label] += 0
      }
    })

    if (label === '1~4') {
      let scoreGE = 0

      if (scores[label] >= 31) {
        scoreGE = 31
      } else if (scores[label] <= 1) {
        scoreGE = 1
      } else {
        scoreGE = scores[label]
      }

      const geScore: any = await NormaGE.findOne({
        where: {
          score: scoreGE
        }
      })

      scores[label] = geScore?.ge
    }

    const normaSW: any = await NormaSW.findOne({
      where: {
        age: age,
        score: scores[label]
      }
    })

    resultsSW[label] = normaSW?.[labelTotal[label as keyof LabelTotalInterface].toLowerCase()]
  }

  for (const label of Object.keys(groupedAnswers)) {
    // Process each group asynchronously
    await processGroup(label, scores, groupedAnswers)
  }

  const responseData = Object.keys(groupedAnswers).map((label, id) => ({
    id: id + 1,
    label: `IST 0${id + 1}`,
    answers: groupedAnswers[label],
    score: scores[label],
    label_total: labelTotal[label as keyof LabelTotalInterface],
    category: resultCategory(Number(resultsSW[label])),
    sw: resultsSW[label]
  }))

  const jml = responseData.map(response => {
    let jmlScore = 0

    jmlScore += response.score

    return jmlScore
  })

  const totalScore = jml.reduce((acc, curr) => acc + curr, 0)

  const resultGESAMT: any = await NormaGESAMT.findOne({
    where: {
      age,
      rw: normaRW(totalScore)
    }
  })

  const SWResult = resultGESAMT?.sw

  const IQResult: any = await IQ.findOne({
    where: {
      sw: SWResult
    }
  })

  const cognitiveResults = {
    corakBerfikir: corakBerfikir(
      responseData[4 - 1]?.sw,
      responseData[6 - 1]?.sw,
      responseData[3 - 1]?.sw,
      responseData[7 - 1]?.sw
    ),
    caraBerfikir: caraBerfikir(
      responseData[1 - 1]?.sw,
      responseData[2 - 1]?.sw,
      responseData[3 - 1]?.sw,
      responseData[4 - 1]?.sw
    ),
    komprehensiBerfikir: {
      score: komprehensiBerfikir(responseData[8 - 1]?.sw, responseData[4 - 1]?.sw),
      category: resultCategory(komprehensiBerfikir(responseData[8 - 1]?.sw, responseData[4 - 1]?.sw))
    },
    decisionMakingSkill: {
      score: decisionMakingSkill(
        responseData[1 - 1]?.sw,
        responseData[3 - 1]?.sw,
        responseData[6 - 1]?.sw,
        responseData[7 - 1]?.sw,
        responseData[9 - 1]?.sw
      ),
      category: resultCategory(
        decisionMakingSkill(
          responseData[1 - 1]?.sw,
          responseData[3 - 1]?.sw,
          responseData[6 - 1]?.sw,
          responseData[7 - 1]?.sw,
          responseData[9 - 1]?.sw
        )
      )
    },
    verbalSkill: {
      score: verbalSkill(responseData[2 - 1]?.sw, responseData[4 - 1]?.sw),
      category: resultCategory(verbalSkill(responseData[2 - 1]?.sw, responseData[4 - 1]?.sw))
    },
    arithmeticSkill: {
      score: arithmeticSkill(responseData[6 - 1]?.sw, responseData[7 - 1]?.sw),
      category: resultCategory(arithmeticSkill(responseData[6 - 1]?.sw, responseData[7 - 1]?.sw))
    }
  }

  const dataResults = {
    results: responseData,
    total: totalScore,
    total_sw: SWResult,
    iq: IQResult?.iq,
    cognitive_results: cognitiveResults
  }

  return dataResults
}

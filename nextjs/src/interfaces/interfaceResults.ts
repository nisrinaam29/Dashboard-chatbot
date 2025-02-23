import type { AnswerTypes } from '@/types/AnswerTypes'

export interface TypeAnswerInterface {
  HORIZONTAL: number
  VERTICAL: number
}

export interface LabelTotalInterface {
  '1~1': string
  '1~2': string
  '1~3': string
  '1~4': string
  '1~5': string
  '1~6': string
  '1~7': string
  '1~8': string
  '1~9': string
}

export interface GroupedAnswers {
  [key: string]: AnswerTypes[]
}

export interface Scores {
  [key: string]: number
}

export interface ResultsSW {
  [key: string]: string | undefined
}

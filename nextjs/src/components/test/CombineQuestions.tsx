import { CardContent } from '@mui/material'
import { useSelector } from 'react-redux'

import { numberToLetter } from '@/libs/numberToLetter'
import type { QuestionTypes } from '@/types/QuestionsTypes'

function renderQuestion(question: QuestionTypes) {
  if (!question || !question?.question) return null

  const questionParts = question?.question?.split('|')

  if (questionParts.length <= 1 && question.type != 'MULTIPLE_IMAGE') {
    return questionParts.map((item: string, index: number) => (
      <p key={index} className='text-center'>
        {item}
      </p>
    ))
  } else if (question.type == 'MULTIPLE_IMAGE') {
    return (
      <div className='border-2 border-black rounded-md'>
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${question.question}`}
          alt={question.question}
          className='h-24'
        />
      </div>
    )
  } else {
    return questionParts.map((item: string, index: number) => (
      <p key={index}>
        {numberToLetter(index + 1)}. {item}
      </p>
    ))
  }
}

const CombineQuestions = () => {
  const { question } = useSelector((state: any) => state.test)

  return <CardContent>{renderQuestion(question)}</CardContent>
}

export default CombineQuestions

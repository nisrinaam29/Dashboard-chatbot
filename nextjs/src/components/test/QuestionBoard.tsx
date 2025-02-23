'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, CardActions } from '@mui/material'

import { backQuestion, nextQuestion, setAnswer, setNumber, setQuestion, setSeconds } from '@/redux/features/test/action'
import { postAnswer } from '@/redux/features/answers/action'
import { getUserLoggedIn } from '@/redux/features/user/action'
import { postLogout } from '@/redux/features/logout/action'
import { toast } from 'react-toastify'
import { encryptor } from '@/utils/cryptograph'

const QuestionBoard = () => {
  const router = useRouter()
  const { number, question, answer } = useSelector((state: any) => state.test)
  const { data, loading } = useSelector((state: any) => state.questions)
  const dataUser = useSelector((state: any) => state.user)
  const dataAnswer = useSelector((state:any)=>state.answer)


  const dispatch: any = useDispatch()
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    dispatch(getUserLoggedIn());
    dispatch(setNumber(Number(localStorage.getItem('last_question')) || 1))
  }, [])

  useEffect(()=>{
    if(dataAnswer?.data?.success) {
      if(number < data?.data?.length) {
        dispatch(nextQuestion())
      }
    }
  }, [dataAnswer?.data?.success, dataAnswer?.data?.data])

  useEffect(() => {
    if (data?.success) {
      const questionData = data?.data?.filter((item: any) => item.number === number)

      dispatch(setQuestion(questionData[0]))
    }

    if (localStorage.getItem('answer')) {
      setAnswers(JSON.parse(localStorage.getItem('answer') || ''))
    }

    const result = answers.find(item => item.question_number == number)
    const answerValue = result ? result.answer : ''

    dispatch(setAnswer(answerValue))
  }, [data?.success, number, answer])


  const handleClickAnswer = (answer: string) => {
    dispatch(
      postAnswer({
        user_pernr: dataUser?.data?.data?.PERNR,
        answer,
        question_id: question.id,
        question_number: number
      })
    )
    localStorage.setItem('last_question', (number + 1).toString())

    const tempArray = answers.filter(item => item.question_number !== number)

    localStorage.setItem('answer', JSON.stringify([...tempArray, { answer, question_number: number }]))

    dispatch(setAnswer(answer))

  }

  const handleNextQuestion = () => {
    if (number == data?.data?.length) {
      dispatch(postLogout())

      localStorage.removeItem('answer')
      localStorage.removeItem('last_question')

      router.push(`/finished/${encryptor(dataUser?.data?.data?.PERNR || '')}`)

    } else {
      dispatch(nextQuestion())
    }
  }

  return (
    <div className='w-full col-span-3'>
      {loading ? (
        <span className='loading loading-dots loading-lg'></span>
      ) : (
        <div>
          <Card className='flex flex-col justify-center items-center h-80'>
              <p className='text-center'>
                {question?.question}
              </p>
            <CardActions className='card-actions-dense w-full flex justify-center'>
              <div className='grid grid-cols-4 gap-4'>
                {['STS', 'TS', 'S', 'SS'].map((item, index) => (
                  <button
                    key={index}
                    className={`border border-blue-800 py-2 px-4 rounded-lg cursor-pointer ${answer == item ? 'bg-blue-800 text-white' : 'text-blue-800 bg-white'}`}
                    onClick={() => handleClickAnswer(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </CardActions>
            <CardActions className='card-actions-dense '>
              {number > 1 ? (
                <Button
                  variant='outlined'
                  onClick={() => dispatch(backQuestion())}
                  className='bg-[#EE7D13] text-white border-white'
                >
                  Back
                </Button>
              ) : null}
              {number === data?.data?.length ? (
              <Button
                variant='outlined'
                onClick={() => handleNextQuestion()}
                className='bg-[#EE7D13] text-white border-white'
              >
                Selesai
              </Button>
              ):null}
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  )
}

export default QuestionBoard

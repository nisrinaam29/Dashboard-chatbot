"use client"
import React, { useEffect, useState } from 'react'

import { Button, Card } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { setNumber } from '@/redux/features/test/action'

const CountBoard = () => {
  const [answers, setAnswers] = useState<any[]>([])
  const { number } = useSelector((state: any) => state.test)
  const { data } = useSelector((state: any) => state.questions)
  const dispatch: any = useDispatch()

  useEffect(() => {
    const storedAnswers = localStorage.getItem('answer')

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers))
    }
  }, [number, data?.data?.length, setAnswers])

  return (
    <Card className='h-80 overflow-auto col-span-2'>
      <div className='p-4'>
        <div className='grid grid-cols-5 gap-4'>
          {Array.from({ length: data?.data?.length }, (_, i) => (
            <Button
              variant={answers.find(item => item.question_number === i + 1) ? 'contained' : 'outlined'}
              key={i}
              className={`${number === i + 1 ? 'bg-[#07529C] text-white' : ''}`}
              onClick={() => dispatch(setNumber(i + 1))}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default CountBoard

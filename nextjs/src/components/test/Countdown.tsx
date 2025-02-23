'use client'
import React from 'react'

import { useDispatch } from 'react-redux'

import { Card, CardContent } from '@mui/material'

import { setOpenCountdown, setSeconds } from '@/redux/features/test/action'
import useCountdown from '@/hooks/useCountdown'
import useRouteCategory from '@/hooks/useRouteCategory'
import { testInstructions } from '@/data/test/testInstructions'

const Countdown = () => {
  const { timeLeft } = useCountdown('COUNTDOWN')

  return (
    <Card className='h-[480px]'>
      <CardContent className='flex justify-center items-center h-full text-9xl text-[#EE7D13]'>{timeLeft}</CardContent>
    </Card>
  )
}

export default Countdown

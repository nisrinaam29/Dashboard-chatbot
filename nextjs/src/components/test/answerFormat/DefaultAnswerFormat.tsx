import { Button } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { answerChara, answerType } from '@/constants/answerType'
import { setAnswer } from '@/redux/features/test/action'

const DefaultAnswerFormat = () => {
  const { question, answer } = useSelector((state: any) => state.test)
  const dispatch: any = useDispatch()

  return answerType[question?.type]?.map((item: string, index: number) => (
    <div key={index} className='w-full'>
      <Button
        variant={`${answer === item ? 'contained' : 'outlined'}`}
        color='primary'
        onClick={() => dispatch(setAnswer(item))}
        className='w-full'
      >
        {answerChara[item] ? answerChara[item] : item}
      </Button>
    </div>
  ))
}

export default DefaultAnswerFormat

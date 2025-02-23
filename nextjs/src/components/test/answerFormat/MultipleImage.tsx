import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { setAnswer } from '@/redux/features/test/action'

const MultipleImage = () => {
  const { question, answer } = useSelector((state: any) => state.test)
  const dispatch: any = useDispatch()

  return (
    <div className='gap-4 justify-center grid grid-cols-5'>
      {question?.labels?.map((item: string, index: number) => (
        <div key={index} className='flex flex-col justify-center'>
          <img src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}${item}`} alt={item} className='h-14 m-auto' />
          <Button
            variant={`${answer === question.values[index] ? 'contained' : 'outlined'}`}
            color='primary'
            onClick={() => dispatch(setAnswer(question.values[index]))}
            className='w-full'
          >
            {question.values[index]}
          </Button>
        </div>
      ))}
    </div>
  )
}

export default MultipleImage

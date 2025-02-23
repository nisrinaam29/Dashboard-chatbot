import { useDispatch, useSelector } from 'react-redux'

import { setAnswer } from '@/redux/features/test/action'

const InputFill = () => {
  const { answer } = useSelector((state: any) => state.test)
  const dispatch: any = useDispatch()

  return (
    <div className='flex justify-center items-center h-16'>
      <input
        onChange={e => dispatch(setAnswer(e.target.value))}
        value={answer}
        type='text'
        placeholder='Enter text here'
        className='text-center border-b border-black focus:outline-none'
      />
    </div>
  )
}

export default InputFill

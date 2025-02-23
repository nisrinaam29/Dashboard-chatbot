import { useDispatch, useSelector } from 'react-redux'

import { setAnswer } from '@/redux/features/test/action'

const MultipleChoice = () => {
  const { question, answer } = useSelector((state: any) => state.test)
  const dispatch: any = useDispatch()


  return (
    <div className='flex flex-col gap-4 justify-center'>
      {question?.labels?.map((item: string, index: number) => (
        <div key={index}>
          <div
            onClick={() => dispatch(setAnswer(question.values[index]))}
            className='flex items-center gap-8 cursor-pointer'
          >
            <button
              className={`w-10 h-10 rounded-full border border-[#675DD8] hover:bg-[#675DD8] hover:text-white cursor-pointer ${
                answer === question.values[index] ? 'bg-[#675DD8] text-white' : ''
              }`}
            >
              {question.values[index]}
            </button>
            <p>{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MultipleChoice

import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { answerType } from '@/constants/answerType'

import { setAnswer, setNumber } from '@/redux/features/test/action'

const NumberChoice = () => {
  const [numberSelect, setNumberSelect] = useState([])
  const { question, answer } = useSelector((state: any) => state.test)
  const dispatch: any = useDispatch()

  useEffect(() => {
    if (numberSelect.length > 0) {
      const numberSorted = numberSelect.sort((a, b) => {
        if (a === 0) {
          return 1
        } else if (b === 0) {
          return -1
        } else {
          return a - b
        }
      })

      dispatch(setAnswer(numberSorted.join('')))
    }
  }, [numberSelect])

  const handleAnswerNumber = (value: string) => {
    if (!numberSelect.includes(value as never)) {
      setNumberSelect([...numberSelect, value as never])
    } else {
      const numbers = numberSelect.filter(num => num !== value)

      setNumberSelect(numbers)
    }
  }

  return answerType[question?.type]?.map((item: string, index: number) => (
    <button
      key={index}
      className={`hover:bg-[#675DD8] hover:text-white cursor-pointer w-10 h-10 rounded-full ${
        numberSelect.includes(item as never) || answer.includes(item.toString())
          ? 'bg-[#675DD8] text-white'
          : 'bg-white'
      }`}
      onClick={() => handleAnswerNumber(item)}
    >
      {item}
    </button>
  ))
}

export default NumberChoice

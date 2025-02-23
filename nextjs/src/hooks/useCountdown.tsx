import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'

import { setOpenCountdown, setSeconds } from '@/redux/features/test/action'
import useRouteCategory from './useRouteCategory'
import { testInstructions } from '@/data/test/testInstructions'

import { encryptor } from '@/utils/cryptograph'

const useCountdown = (type: string) => {
  const { openCountdown, seconds } = useSelector((state: any) => state.test)
  const [timeLeft, setTimeLeft] = useState<number>(seconds)
  const dispatch: any = useDispatch()
  const { parentID, categoryID, categoryPath } = useRouteCategory()
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft === 1) {
        if (type == 'COUNTDOWN') {
          dispatch(setOpenCountdown(false))

          dispatch(setSeconds(testInstructions[parentID - 1]?.children[categoryID - 1]?.time))
          setTimeLeft(seconds)
        } else if (type == 'TIMER') {
          router.push(`/instructions/${encryptor(`${parentID}~${categoryID + 1}`)}`)
        } else if (type == 'TIMER_INSTRUCTION' && parentID == 1 && categoryID == 9) {
          router.push(`/test/${categoryPath}`)
        }
      } else {
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, openCountdown])

  return { timeLeft, setTimeLeft }
}

export default useCountdown

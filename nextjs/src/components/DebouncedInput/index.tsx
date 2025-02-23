import { useEffect, useState } from 'react'

import type { TextFieldProps } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import { useDispatch } from 'react-redux'
import { clearSearch } from '@/redux/features/general/action'

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & TextFieldProps) => {
  // States
  const [value, setValue] = useState(initialValue)
  const dispatch: any = useDispatch()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(()=>{
    return dispatch(clearSearch())
  }, [])


  return (
    <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

export default DebouncedInput

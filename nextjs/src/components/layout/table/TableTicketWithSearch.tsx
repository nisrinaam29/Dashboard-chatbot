'use client'
import { useEffect, useState } from 'react'
import { Button, Card, CardHeader, Checkbox, FormControlLabel, Radio, RadioGroup, Skeleton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import DebouncedInput from '@/components/DebouncedInput'
import type { ChildrenType } from '@/@core/types'
import FilterModal from '@/components/FilterModal'
import { clearSearch, setSearch } from '@/redux/features/general/action'
import { clearFilter, setFilter } from '@/redux/features/tickets/action'
import { useRouter } from 'next/navigation'
import Refresh from '@/components/Refresh'
const exception = ['SETTINGS']
const arrCat = ['Business Developer', 'Human Relations', 'Others']

const arrTime = ['oldest', 'newest']

const TableTicketWithSearch = ({ children, type }) => {
  const { search } = useSelector((state: any) => state.general)
  const dispatch: any = useDispatch()
  const { loading, filter } = useSelector((state: any) => state.tickets)
  const router = useRouter()
  const handleChangeRadio = (event: any) => {
    dispatch(setFilter({ ...filter, time: event.target.value }))
  }

  const [categories, setCategories] = useState<string[]>([])

  const handleChangeCheckbox = (event: any, item: string) => {
    const isChecked = event.target.checked
    if (isChecked && !categories.includes(item)) {
      setCategories([...categories, item])
    } else if (!isChecked && categories.includes(item)) {
      const newCategories = categories.filter(i => i !== item)
      setCategories(newCategories)
    }
  }

  const handleChangeSearchBar = (value: any) => {
    dispatch(setSearch(String(value)))
  }

  useEffect(() => {
    dispatch(setFilter({ ...filter, category: categories.join(',') }))
  }, [categories])

  return (
    <Card className='relative h-full'>
      <CardHeader
        title={
          exception.includes(type) ? (
            'Overall Performance'
          ) : (
            <DebouncedInput
              value={search ?? ''}
              onChange={handleChangeSearchBar}
              placeholder='Search all columns...'
              className='mr-4'
            />
          )
        }
        action={
          <>
            <RadioGroup
              row
              className=' ' // Added flex and flex-col for vertical layout
              value={filter.time}
              defaultValue='checked'
              name='basic-radio'
              onChange={handleChangeRadio}
              aria-label='basic-radio'
            >
              <p className=' text-large flex text-neutral-700 items-center pr-3 '>Sort:</p>
              {arrTime.map(item => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            <Refresh/>     
            </RadioGroup>
          </>
        }
      />
      <div>{children}</div>
    </Card>
  )
}

export default TableTicketWithSearch

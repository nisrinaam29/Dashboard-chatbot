'use client'
import { useState } from 'react'

import { Button, Card, CardHeader } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import DebouncedInput from '@/components/DebouncedInput'
import type { ChildrenType } from '@/@core/types'
import CreateModal from '@/components/CreateModal'
import CreateQuestion from '@/components/createForm/CreateQuestion'
import CreateCategory from '@/components/createForm/CreateCategory'
import { setSearch } from '@/redux/features/general/action'

const typeForm = {
  "QUESTION": <CreateQuestion/>,
  "CATEGORY": <CreateCategory/>
}

const TableWithSearch = ({ children, type }) => {
  const {search} = useSelector((state:any)=>state.general)
  const dispatch:any = useDispatch()

  return (
    <Card>
      <CardHeader
        title={
          <DebouncedInput
            value={search ?? ''}
            onChange={value => dispatch(setSearch((String(value))))}
            placeholder='Search all columns...'
          />
        }
        action={
          <CreateModal>
            {typeForm[type]}
          </CreateModal>
        }
      />
      {children}
    </Card>
  )
}

export default TableWithSearch

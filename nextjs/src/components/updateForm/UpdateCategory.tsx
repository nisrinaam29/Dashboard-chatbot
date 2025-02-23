import React, { useEffect, useState } from 'react'

import { Button, DialogActions, DialogContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { setCloseModalUpdate } from '@/redux/features/modal/action'
import { updateCategory } from '@/redux/features/categories/action'

const UpdateCategory = () => {
  const {  updateData } = useSelector((state: any) => state.categories)
  const { selectedID, data, } = useSelector((state:any) => state.categories)
  const dispatch: any = useDispatch()

  const [modifiedData, setModifiedData] = useState({
    text: '',
    name: ''
  })

  useEffect(() => {
    const selectedData = data?.data?.categories?.filter(item => item.id === selectedID)
    if (selectedData && selectedData[0]) {
      setModifiedData({
        text: selectedData[0].text,
        name: selectedData[0].name
      })
    }
  }, [selectedID, data])

  const handleChangeInput = e => {
    const { name, value } = e.target
    setModifiedData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateCategory(modifiedData, selectedID))
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <CustomTextField
          id='text'
          value={modifiedData.text}
          name='text'
          autoFocus
          fullWidth
          type='text'
          label='Text'
          placeholder=''
          onChange={handleChangeInput}
        />
        <CustomTextField
          id='name'
          value={modifiedData.name}
          name='name'
          fullWidth
          type='text'
          label='Nama'
          onChange={handleChangeInput}
        />
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={() => dispatch(setCloseModalUpdate())}>Batal</Button>
        <Button variant='tonal' type='submit'>
          Simpan
        </Button>
      </DialogActions>
    </form>
  )
}

export default UpdateCategory

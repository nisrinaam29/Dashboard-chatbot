import { useEffect, useState } from 'react'

import { Button, DialogActions, DialogContent, MenuItem } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { setCloseModal, setCloseModalUpdate } from '@/redux/features/modal/action'
import { clearCategory, getAllCategories, postCategory } from '@/redux/features/categories/action'

const CreateCategory = () => {
  const {createData, updateData} = useSelector(
    (state: any) => state.categories
  )
  const [modifiedData, setModifiedData] = useState({
    text: '',
    name: ''
  })

  const dispatch: any = useDispatch()

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target

    setModifiedData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  useEffect(() => {
    if (createData?.success) {
      }
    dispatch(setCloseModalUpdate())
    })
    

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postCategory(modifiedData))
    // dispatch(setCloseModal())
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <CustomTextField
            id='text'
            name='text'
            autoFocus
            fullWidth
            type='text'
            label='Text'
            onChange={handleChangeInput}
          />
          <CustomTextField id='name' name='name' fullWidth type='text' label='Nama' onChange={handleChangeInput} />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={() => dispatch(setCloseModal())}>Batal</Button>
          <Button variant='tonal' type='submit'>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </>
  )
}

export default CreateCategory

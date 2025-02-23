import { useEffect, useState } from 'react'

import { Button, DialogActions, DialogContent, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { setCloseModal } from '@/redux/features/modal/action'
import { getAllCategories } from '@/redux/features/categories/action'
import { createQuestion } from '@/redux/features/questions/action'

const CreateQuestion = () => {
  const {createData} = useSelector((state: any) => state.questions)

  const { data} = useSelector((state:any) => state.categories)
  // const {createQuestion }= useSelector(state => state.questions)

  const dispatch: any = useDispatch()

  const [modifiedData, setModifiedData] = useState({
    category_id: 0,
    text: '',
    answer: ''
  })

  useEffect(()=>{
    dispatch(getAllCategories("all"))
  }, [data?.success])

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target

    setModifiedData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  useEffect(() => {
    if (createData?.success) {
      dispatch(setCloseModal())
    } 
  })
  console.log(data?.data?.categories)
  const handleSubmit = (e:any) => {
    e.preventDefault()
    dispatch(createQuestion(modifiedData))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <CustomTextField select fullWidth defaultValue='' label='Kategori' id='custom-select' autoFocus name='category_id' onChange={handleChangeInput}>
            {data?.data?.categories?.map((item:any) => (
              <MenuItem value={item.id} key={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            id='name'
            fullWidth
            type='text'
            label='Pertanyaan'
            name='text'
            onChange={handleChangeInput}
          />
          <CustomTextField
            id='name'
            fullWidth
            type='text'
            label='Jawaban'
            name='answer'
            onChange={handleChangeInput}
          />
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

export default CreateQuestion

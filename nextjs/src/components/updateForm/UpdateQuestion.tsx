import { useEffect, useState } from 'react'

import { Button, DialogActions, DialogContent, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { setCloseModalUpdate } from '@/redux/features/modal/action'
import { createQuestion, updateQuestion } from '@/redux/features/questions/action'
import { getAllCategories } from '@/redux/features/categories/action'

const UpdateQuestion = () => {
  const { data, selectedID } = useSelector(state => state.categories)
  const dataQuestion = useSelector(state => state.questions)

  const dispatch: any = useDispatch()

  const [modifiedData, setModifiedData] = useState({
    text: '',
    answer: '',
    category_id: 0
  })
  useEffect(()=>{
    dispatch(getAllCategories("all"))
   
  }, [data?.success])
  useEffect(() => {
    const selectedData = dataQuestion?.data?.data?.questions?.filter(item => item.id === selectedID)
    if (selectedData && selectedData[0]) {
      setModifiedData({
        text: selectedData[0].text,
        answer: selectedData[0].answer,
        category_id: selectedData[0].category.id
      })
    }
    console.log(data?.data?.categories)

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
    dispatch(updateQuestion(modifiedData, selectedID))
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <CustomTextField
          select
          fullWidth
          defaultValue=''
          label='Kategori'
          id='custom-select'
          name='category_id'
          onChange={handleChangeInput}
          value={modifiedData.category_id}
          autoFocus
        >
          {data?.data?.categories?.map(item => (
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
          value={modifiedData.text}
        />
        <CustomTextField
          id='name'
          fullWidth
          type='text'
          label='Jawaban'
          name='answer'
          onChange={handleChangeInput}
          value={modifiedData.answer}
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

export default UpdateQuestion

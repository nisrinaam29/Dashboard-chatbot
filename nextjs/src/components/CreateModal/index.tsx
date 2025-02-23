import { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { getAllCategories } from '@/redux/features/categories/action'
import { setOpenModal , setCloseModal } from '@/redux/features/modal/action'


const CreateModal = ({children}) => {
  const {openModal} = useSelector((state)=>state.modal)
  const dispatch: any = useDispatch()

  return (
    <>
      <Button onClick={()=>dispatch(setOpenModal())} variant='tonal'>
        Tambah
      </Button>
      <Dialog open={openModal} onClose={()=>dispatch(setCloseModal())} aria-labelledby='form-dialog-title w-3/4'>
        <DialogTitle id='form-dialog-title'>Tambah Data</DialogTitle>
        {children}
      </Dialog>
    </>
  )
}

export default CreateModal

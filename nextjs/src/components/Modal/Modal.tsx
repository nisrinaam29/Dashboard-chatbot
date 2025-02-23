'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { setCloseModal } from '@/redux/features/modal/action'

const Modal = () => {
  const { openModal, message, title, buttonAction } = useSelector((state: any) => state.modal)
  const dispatch: any = useDispatch()

  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => dispatch(setCloseModal())}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={() => dispatch(setCloseModal())}>Batal</Button>
          <Button onClick={buttonAction}>Ya</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Modal

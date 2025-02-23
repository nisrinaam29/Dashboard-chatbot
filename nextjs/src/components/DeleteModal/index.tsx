// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DeleteModal = ({handleDelete}) => {
  // States
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleClickDelete = () => {
    handleDelete()
    handleClose()
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen}>
      <i className='tabler-trash' />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Yakin ingin menghapus item?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Dengan menghapus item, maka item tidak akan muncul kembali di chatbot.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Tidak</Button>
          <Button onClick={handleClickDelete}>Ya</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteModal

import { Dialog, DialogTitle } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import { setCloseModalUpdate } from '@/redux/features/modal/action'


const UpdateModal = ({children}) => {
  const {openModalUpdate} = useSelector((state:any)=>state.modal)
  const dispatch: any = useDispatch()
  
  return (
    <>
      <Dialog open={openModalUpdate} onClose={()=>dispatch(setCloseModalUpdate())} aria-labelledby='form-dialog-title w-3/4'>
        <DialogTitle id='form-dialog-title'>Edit Data</DialogTitle>
        {children}
      </Dialog>
    </>
  )
}

export default UpdateModal

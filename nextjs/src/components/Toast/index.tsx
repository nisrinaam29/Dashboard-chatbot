'use client'

import React, { useEffect } from 'react'

import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { showToast } from '@/redux/features/toast/action'

const Toast = () => {
  const { isOpen, isSuccess, message } = useSelector((state: any) => state.toast)

  const dispatch: any = useDispatch()

  const handleClose = () => {
    dispatch(showToast({ isOpen: false, isSuccess: true, message: '' }))
  }

  useEffect(() => {
    setTimeout(() => handleClose(), 3000)
  }, [isOpen])

  return isOpen ? (

    // <div className="toast toast-end z-50">
    //   <div className={`alert ${isSuccess ? "alert-success" : "alert-error"}`}>
    //     <span>{message}</span>
    //   </div>
    // </div>

    <Alert severity={isSuccess ? 'success' : 'error'} className='fixed z-50 top-8 right-8'>
      {message}
    </Alert>
  ) : null
}

export default Toast

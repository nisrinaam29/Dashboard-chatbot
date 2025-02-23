'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports

// MUI Imports

import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'

// Type Imports
import { Card, CardContent } from '@mui/material'

// eslint-disable-next-line import/no-unresolved
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line import/no-unresolved
import { toast, ToastContainer } from 'react-toastify'

// eslint-disable-next-line import/no-unresolved
import nookies, { setCookie } from 'nookies'

// eslint-disable-next-line import/no-unresolved
import Logo from '@/components/layout/shared/Logo'
// eslint-disable-next-line import/no-unresolved
import CustomTextField from '@/@core/components/mui/TextField'

// eslint-disable-next-line import/no-unresolved
import AuthIllustrationWrapper from '@/components/AuthIllustrationWrapper'

// eslint-disable-next-line import/no-unresolved
import { clearLogin, postLogin } from '@/redux/features/login/action'
// eslint-disable-next-line import/no-unresolved
import { setToken } from '@/libs/setHeader'

const LoginV2 = () => {
  const dispatch: any = useDispatch()
  const router = useRouter()
  const { data, error, loading } = useSelector((state: any) => state.login)

  // States
  const [modifiedData, setModifiedData] = useState({
    email: '',
    password: ''
  })

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target

    setModifiedData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmitLogin = (e: any) => {
    e.preventDefault()

    dispatch(postLogin(modifiedData))
  }

  useEffect(() => {
    if (data?.success) {
      setToken(data?.data?.token)
      router.push('/admin/ongoing-ticket')
      toast.success(data?.message)
    } else if (!error?.success) {
      toast.error(error?.message)
    }

    return dispatch(clearLogin())
  }, [data?.success, error?.success, error?.message])

  return (
    <div className='flex h-screen items-center justify-center w-full'>
      <AuthIllustrationWrapper>
        <ToastContainer />
        <Card className='flex flex-col sm:is-[450px]'>
          <CardContent className='sm:!p-12'>
            <div className='flex flex-col justify-center mbe-6'>
              <Logo />
              <h2 className=' text-blue-800 self-center '>Chatbot</h2>

            </div>
            <form className='flex flex-col gap-6' onSubmit={e => handleSubmitLogin(e)}>
              <CustomTextField
                autoFocus
                fullWidth
                label='Email'
                placeholder='Masukkan Email'
                name='email'
                value={modifiedData.email}
                onChange={handleChangeInput}
              />
              <CustomTextField
                autoFocus
                fullWidth
                type='password'
                label='Password'
                placeholder='Masukkan Password'
                name='password'
                value={modifiedData.password}
                onChange={handleChangeInput}
              />

          
              <Button fullWidth variant='contained' type='submit' disabled={loading}>
                Masuk
              </Button>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationWrapper>
    </div>
  )
}

export default LoginV2

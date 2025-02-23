'use client'
import { Button, Card, CardHeader, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { clearProfile, getUserLoggedIn, putProfile } from '@/redux/features/user/action'
import { toast, ToastContainer } from 'react-toastify'
import TextField from '@mui/material/TextField'
import { clearResetPassword, putResetPassword } from '@/redux/features/changepasswords/action'

export default function Profile() {
  const { data, error, loading, dataEditProfile, errorEditProfile } = useSelector((state: any) => state.user)
  // const { dataEditProfile, errorEditProfile, loadinge } = useSelector((state: any) => state.user)
  const { dataPassword, errorPassword, loadingPassword } = useSelector((state: any) => state.changepasswords)
  const dispatch: any = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangePassword, setChangePassword] = useState(false)
  const [originalUser, setOriginalUser] = useState({
    name: '',
    email: '',
    phone_number: ''
  })

  const [modifiedPassword, setModifiedPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  // Update password input values
  const handleChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setModifiedPassword(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmitLogin = (e: any) => {
    e.preventDefault()
    dispatch(putProfile(modifiedData))
    // setIsEditing(false)
  }
  // Submit password change
  const handleSubmitChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(putResetPassword(modifiedPassword))
  }
  // Fetch user profile data
  useEffect(() => {
    dispatch(getUserLoggedIn())
  }, [dataEditProfile?.success])

  useEffect(() => {
     dispatch(clearProfile())
  }, [dataEditProfile?.success])

  
  useEffect(() => {
    if (data?.data) {
      setOriginalUser(data?.data)
      setModifiedData(data?.data)
    }
  }, [data])

  // State for profile information
  const [modifiedData, setModifiedData] = useState({
    name: '',
    email: '',
    phone_number: ''
  })

  // Set profile data when successfully fetched
  useEffect(() => {
    if (data?.success) {
      setOriginalUser(data.data)
      setModifiedData(data.data)
    }
  }, [])

  // Handle success and error for password change
  useEffect(() => {
    if (dataPassword?.success) {
      setChangePassword(false)
      toast.success(dataPassword?.message)
    } else if (errorPassword?.message) {
      toast.error(errorPassword?.message)
    }
  }, [dataPassword?.success, errorPassword?.message])

  // Handle profile save success or error
  useEffect(() => {
    if (dataEditProfile?.success) {
      toast.success(dataEditProfile?.message)
      setIsEditing(false)
    } else if (errorEditProfile?.message) {
      toast.error(errorEditProfile?.message)
    }
  }, [dataEditProfile?.success, errorEditProfile?.message])

  // Update profile inputs
  const handleFormInput = (e: any) => {
    const { name, value } = e.target
    setModifiedData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  // Toggle password change form
  const handleChangePassword = () => {
    setChangePassword(prev => !prev)
  }

  return (
    <>
      <Card className='w-full'>
        <ToastContainer />
        <CardHeader
          title='Profile'
          action={
            <>
              <div className='flex gap-5'>
                {isEditing && (
                  <Button
                    variant={isChangePassword ? 'outlined' : 'tonal'}
                    color={isChangePassword ? 'error' : 'info'}
                    // className='flex w-fit bg-slate-50 '
                    onClick={handleChangePassword}
                  >
                    {isChangePassword ? 'Cancel Change' : 'Change Password'}
                  </Button>
                )}
                 {
                    isChangePassword? '': <Button
                    variant={isEditing ? 'outlined' : 'tonal'}
                    color={isEditing ? 'error' : 'primary'}
                    onClick={() => {
                      if (isEditing) setModifiedData(originalUser) // Reset form data when canceling
                      setIsEditing(prev => !prev)
                      setChangePassword(false)
                    }}
                  >
                   
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                  }
                
              </div>
            </>
          }
        />

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmitLogin} className='space-y-4 p-4 overflow-auto'>
          {[
            { label: 'Name', name: 'name', value: modifiedData.name },
            { label: 'Email', name: 'email', value: modifiedData.email },
            { label: 'Phone Number', name: 'phone_number', value: modifiedData.phone_number }
          ].map(({ label, name, value }) => (
            <div key={name} className='flex items-center gap-4'>
              <strong className='min-w-36'>{label}</strong>
              <TextField
                variant='standard'
                name={name}
                value={value}
                onChange={handleFormInput}
                disabled={!isEditing || isChangePassword}
                fullWidth
              />
            </div>
          ))}
          {!isChangePassword && isEditing && (
            <Button variant='contained' type='submit' disabled={loading} className=' mt-6 '>
              Save
              {loading && (
                <CircularProgress
                  size={24}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2'
                  color='inherit'
                />
              )}
            </Button>
          )}
        </form>

        {/* Password Change Form */}
        {isEditing && isChangePassword && (
          <form className='space-y-4 px-4 overflow-auto ' onSubmit={handleSubmitChangePassword}>
            <div className='flex items-center gap-4'>
              <strong className='min-w-36'>New Password</strong>
              <TextField
                type='password'
                variant='standard'
                name='newPassword'
                onChange={handleChangePasswordInput}
                fullWidth
              />
            </div>
            <div className='flex items-center gap-4'>
              <strong className='min-w-36'>Confirm Password</strong>
              <TextField
                variant='standard'
                onChange={handleChangePasswordInput}
                name='confirmPassword'
                type='password'
                fullWidth
              />
            </div>
            <Button variant='contained' type='submit' disabled={loadingPassword} className=' mt-6 '>
              Change Password
              {loadingPassword && (
                <CircularProgress
                  size={24}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2'
                  color='inherit'
                />
              )}
            </Button>
          </form>
        )}
      </Card>
    </>
  )
}

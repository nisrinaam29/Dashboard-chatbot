import type { ResetPassword, UpdateData, UserTypes } from '@/types/UserTypes'
import { instance } from '../axios'
import { getAllUsersPath, getUserLoggedInPath, putChangePassword, putUserProfile  } from '../path'


export const getUserLoggedInService = async () => {
  return instance({
    url: getUserLoggedInPath,
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}
export const getAllUsersService = async (search = '') => {
  return instance({
    url: `${getAllUsersPath}?search=${search}`,
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}
export const updateProfileService = async(data:UpdateData)=>{
  return instance({
    url: putUserProfile,
    method: 'PUT',
    data
  }) .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}
export const resetPasswordService = async ( data: ResetPassword)=>{
  return instance ({
    url: putChangePassword,
    method: 'PUT',
    data
  })
  .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}

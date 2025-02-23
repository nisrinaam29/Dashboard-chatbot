import type { Dispatch } from 'react'

import * as types from '@/constants/types'
import type { Actions } from '@/interfaces/actions'
import { getUserLoggedInService, updateProfileService } from '@/services/users'
import type { UpdateData, UserTypes } from '@/types/UserTypes'

export const getUserLoggedIn = () => async (dispatch: Dispatch<Actions>) => {
  try {
    dispatch({
      type: types.GET_USER_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await getUserLoggedInService()

    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.GET_USER_FAILED,
      payload: error
    })
  }
}
// (data:UserTypes)
export const putProfile =(dataParams:UpdateData) => async (dispatch: Dispatch<Actions>) => {
  try {
    dispatch({
      type: types.PUT_PROFILE_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await updateProfileService(dataParams)

    dispatch({
      type: types.PUT_PROFILE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.PUT_PROFILE_FAILED,
      payload: error
    })
  }
}

export const clearProfile = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_PROFILE
    
  })
}

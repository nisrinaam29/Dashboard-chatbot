import * as types from '@/constants/types'
import type { Actions } from "@/interfaces/actions";
import { putChangePassword } from '@/services/path'
import { resetPasswordService } from '@/services/users'
import { ResetPassword } from '@/types/UserTypes'
import type { Dispatch } from "react";
export const putResetPassword =   (dataParams: ResetPassword) => async (dispatch: Dispatch<Actions>)=>{
    try{
        dispatch({
            type: types.PUT_RESETPASS_LOADING,
            payload:{
                loading: true
            },
        })
        const data = await resetPasswordService(dataParams)
        dispatch({
            type: types.PUT_RESETPASS_SUCCESS,
            payload: data
          })
    }catch (error) {
        dispatch({
          type: types.PUT_RESETPASS_ERROR,
          payload: error
        })
      }
}

export const clearResetPassword = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_RESETPASS
  })

}
  
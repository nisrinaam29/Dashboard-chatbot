import type { Dispatch } from "react";

import * as types from "@/constants/types";
import type { Actions } from "@/interfaces/actions";
import { postLoginService } from "@/services/auth";
import type { LoginData, UserTypes } from "@/types/UserTypes";

export const postLogin =
  (dataParams: LoginData) => async (dispatch: Dispatch<Actions>) => {
    try {
      dispatch({
        type: types.POST_LOGIN_LOADING,
        payload: {
          loading: true,
        },
      });

      const data = await postLoginService(dataParams);

      dispatch({
        type: types.POST_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.POST_LOGIN_FAILED,
        payload: error,
      });
    }
  };


export const clearLogin = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_LOGIN
  })
}
  

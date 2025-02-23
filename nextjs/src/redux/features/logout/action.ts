import type { Dispatch } from "react";

import * as types from "@/constants/types";
import type { Actions } from "@/interfaces/actions";
import { postLogoutService } from "@/services/auth";

export const postLogout =
  () => async (dispatch: Dispatch<Actions>) => {
    try {
      dispatch({
        type: types.POST_LOGOUT_LOADING,
        payload: {
          loading: true,
        },
      });

      const data = await postLogoutService();

      dispatch({
        type: types.POST_LOGOUT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: types.POST_LOGOUT_FAILED,
        payload: error,
      });
    }
  };

export const clearLogout = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_LOGOUT
  })
}

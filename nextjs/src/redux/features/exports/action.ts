import * as types from '@/constants/types'
import { getExportsService } from '@/services/export';
export const getExport = () => async (dispatch:any) => {
    try {
      dispatch({
        type: types.GET_EXPORTS_LOADING,
        payload: {
          loading: true
        }
      })
      const data = await getExportsService();
      dispatch({
        type: types.GET_EXPORTS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: types.GET_EXPORTS_ERROR,
        payload: error
      })
    }
  }

export const clearExport = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_EXPORT
  })
}
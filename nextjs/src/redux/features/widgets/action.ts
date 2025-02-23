import * as types from '@/constants/types'
import { getWidgetsService } from '@/services/widgets'

export const getWidgets =()=> async(dispatch:any)=>{
    try {
        dispatch({
            type: types.GET_WIDGETS_LOADING,
            payload:{
                loading:true
            }
        })
        const data = await getWidgetsService()
        dispatch({
            type:types.GET_WIDGETS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.GET_WIDGETS_ERROR,
            payload: error
          })
    }
}
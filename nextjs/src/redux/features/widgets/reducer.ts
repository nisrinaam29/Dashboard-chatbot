import * as types from '@/constants/types'

const initialState = {
    data: null,
    loading: false,
    error: null,
  }
  export default function widgetsReducer(state = initialState, action: any) {
    switch (action.type) {
      case types.GET_WIDGETS_LOADING:
        return {
          ...state,
          loading: action.payload.loading,
          error: null
        }
      case types.GET_WIDGETS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null
        }
      case types.GET_WIDGETS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      
        default:
          return state
  
    }
  }
  

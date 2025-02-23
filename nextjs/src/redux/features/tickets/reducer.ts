import * as types from '@/constants/types'

const initialState = {
  data: null,
  loading: false,
  error: null,
  filter: '',
}

export default function ticketsReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GET_TICKETS_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        error: null
      }
    case types.GET_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.GET_TICKETS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case types.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      }

    case types.CLEAR_TICKET:

      return {
        ...state,
        data: initialState.data,
        loading: initialState.loading,
        error: initialState.error
      }

    case types.CLEAR_FILTER:

      return {
        ...state,
        filter: initialState.filter,
      }
    default:
      return state
  }
}



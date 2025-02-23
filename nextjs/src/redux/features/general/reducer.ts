import * as types from '@/constants/types'

const initialState = {
  search: ''
}

export default function generalReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_SEARCH:
      return {
        ...state,
        search: action.payload.search
      }
    case types.CLEAR_SEARCH:

      return {
        ...state,
        search: initialState.search,
      }
    default:
      return state
  }
}

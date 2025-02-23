import * as types from '@/constants/types'

const initialState = {
  data: null,
  loading: false,
  error: null,
  createData: null,
  loadingData: false,
  errorData: null
}

export default function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GET_MESSAGES_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        error: null
      }
    case types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.GET_MESSAGES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case types.POST_MESSAGES_LOADING:
      return {
        ...state,
        createLoading: action.payload.loading,
        createError: null
      }
    case types.POST_MESSAGES_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createData: action.payload,
        createError: null
      }
    case types.POST_MESSAGES_ERROR:
      return {
        ...state,
        createLoading: false,
        createError: action.payload
      }
    case types.CLEAR_MESSAGES:
      return initialState
    default:
      return state
  }
}

// export default function messagesReducer(state = initialState, action: any) {
//   switch (action.type) {
//     case types.GET_MESSAGES_LOADING:
//       return {
//         ...state,
//         loading: action.payload.loading,
//         error: null
//       }
//     case types.GET_MESSAGES_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null
//       }
//     case types.GET_MESSAGES_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       }
//       default:
//         return state
//   }
// }

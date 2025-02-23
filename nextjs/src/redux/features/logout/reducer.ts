import * as types from "@/constants/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function logoutReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.POST_LOGOUT_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        error: null
      }
    case types.POST_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.POST_LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case types.CLEAR_LOGOUT:
      return initialState
    default:
      return state
  }
}

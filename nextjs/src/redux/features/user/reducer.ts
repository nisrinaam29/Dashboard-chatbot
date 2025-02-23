import * as types from "@/constants/types";

const initialState = {
  data: null,
  loading: false,
  error: null,
  dataEditProfile: null,
  loadingEditProfile: false,
  errorEditProfile: null
}
export default function UserLoggedInReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GET_USER_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        error: null
      }
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      case types.PUT_PROFILE_LOADING:
        return {
          ...state,
          loadingEditProfile: action.payload.loading,
          errorEditProfile: null
        }
      case types.PUT_PROFILE_SUCCESS:
        return {
          ...state,
          loadingEditProfile: false,
          dataEditProfile: action.payload,
          errorEditProfile: null
        }
      case types.PUT_PROFILE_FAILED:
        return {
          ...state,
          loadingEditProfile: false,
          errorEditProfile: action.payload
        }
      case types.CLEAR_PROFILE:
        return{
          ...state,
          dataEditProfile: initialState.dataEditProfile,
          errorEditProfile: initialState.errorEditProfile,
          loadingEditProfile: initialState.loadingEditProfile,
        }
    default:
      return state
  }
}

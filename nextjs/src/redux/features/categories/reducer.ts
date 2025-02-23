import * as types from '@/constants/types'

const initialState = {
  data: null,
  loading: false,
  error: null,
  createData: null,
  createLoading: false,
  createError: null,
  deleteData: null,
  deleteLoading: false,
  deleteError: null,
  updateData: null,
  updateLoading: false,
  updateError: null,
  getByIDData: null,
  getByIDLoading: false,
  getByIDError: null,
  selectedID: 0
}

export default function categoriesReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
        error: null
      }
    case types.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case types.GET_ALL_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case types.POST_CATEGORY_LOADING:
      return {
        ...state,
        createLoading: action.payload.loading,
        createError: null
      }
    case types.POST_CATEGORY_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createData: action.payload,
        createError: null
      }
    case types.POST_CATEGORY_FAILED:
      return {
        ...state,
        createLoading: false,
        createError: action.payload
      }
    case types.DELETE_CATEGORY_LOADING:
      return {
        ...state,
        deleteLoading: action.payload.loading,
        deleteError: null
      }
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteData: action.payload,
        deleteError: null
      }
    case types.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload
      }
    case types.UPDATE_CATEGORY_LOADING:
      return {
        ...state,
        updateLoading: action.payload.loading,
        updateError: null
      }
    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateData: action.payload,
        updateError: null
      }
    case types.UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload
      }
    case types.GET_CATEGORY_BY_ID_LOADING:
      return {
        ...state,
        getByIDLoading: action.payload.loading,
        getByIDError: null
      }
    case types.GET_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        getByIDLoading: false,
        getByIDData: action.payload,
        getByIDError: null
      }
    case types.GET_CATEGORY_BY_ID_FAILED:
      return {
        ...state,
        getByIDLoading: false,
        getByIDError: action.payload
      }
    case types.SET_SELECTED_ID:
      return {
        ...state,
        selectedID: action.payload.selectedID
      }
    case types.CLEAR_CATEGORY:
      return {
        ...state,
        createData: initialState.createData,
        createLoading: initialState.createLoading,
        createError: initialState.createError,
        updateData: initialState.updateData,
        updateLoading: initialState.updateLoading,
        updateError: initialState.updateError,
        deleteData: initialState.deleteData,
        deleteLoading: initialState.deleteLoading,
        deleteError: initialState.deleteError
      }
    default:
      return state
  }
}

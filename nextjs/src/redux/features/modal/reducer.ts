import * as types from '@/constants/types'

const initialState = {
  openModal: false,
  openModalUpdate: false
}

export default function modalReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.SET_OPEN_MODAL:
      return {
        ...state,
        openModal: action.payload.openModal
      }
    case types.SET_CLOSE_MODAL:
      return {
        ...state,
        openModal: action.payload.openModal
      }
    case types.SET_OPEN_MODAL_UPDATE:
      return {
        ...state,
        openModalUpdate: action.payload.openModalUpdate
      }
    case types.SET_CLOSE_MODAL_UPDATE:
      return {
        ...state,
        openModalUpdate: action.payload.openModalUpdate
      }
    default:
      return state
  }
}

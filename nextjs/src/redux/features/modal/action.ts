import type { Dispatch } from "react";

import * as types from "@/constants/types";


export const setOpenModal = () => (dispatch: any) => {
  dispatch({
    type: types.SET_OPEN_MODAL,
    payload: {
      openModal: true
    }
  })
}

export const setCloseModal = () => (dispatch: any) => {
  dispatch({
    type: types.SET_CLOSE_MODAL,
    payload: {
      openModal: false
    }
  })
}

export const setOpenModalUpdate = () => (dispatch: any) => {
  dispatch({
    type: types.SET_OPEN_MODAL_UPDATE,
    payload: {
      openModalUpdate: true
    }
  })
}

export const setCloseModalUpdate = () => (dispatch: any) => {
  dispatch({
    type: types.SET_CLOSE_MODAL_UPDATE,
    payload: {
      openModalUpdate: false
    }
  })
}

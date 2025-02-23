import type { Dispatch } from 'react'

import * as types from '@/constants/types'

export const setSearch = (value = '') => (dispatch) => {
  dispatch({
    type: types.SET_SEARCH,
    payload: {
      search: value
    }
  })
}

export const clearSearch = () => (dispatch:any) => {
  dispatch({
    type: types.CLEAR_SEARCH,
  })
}
import * as types from '@/constants/types'
import { getMessagesService, postMessagesService } from '@/services/tickets'

export const getMessages = (uid: string) => async (dispatch:any) => {
  try {
    dispatch({
      type: types.GET_MESSAGES_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await getMessagesService(uid)
        
    dispatch({
      type: types.GET_MESSAGES_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.GET_MESSAGES_ERROR,
      payload: error
    })
  }
}

export const postMessages = (uid: string, messageData: any) => async dispatch => {
  try {
    dispatch({
      type: types.POST_MESSAGES_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await postMessagesService(uid, messageData)

    dispatch({
      type: types.POST_MESSAGES_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.POST_MESSAGES_ERROR,
      payload: error
    })
  }
}

export const clearMessages = () => (dispatch: any) => {
  dispatch({
    type: types.CLEAR_MESSAGES,
  })
}

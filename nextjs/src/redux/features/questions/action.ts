import type { Dispatch } from 'react'

import * as types from '@/constants/types'
import { deleteQuestionService, getAllQuestionsService, postQuestionService, updateQuestionService } from '@/services/questions'

export const getAllQuestions = (page = 1, search='') => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_ALL_QUESTIONS_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await getAllQuestionsService(page, search)

    dispatch({
      type: types.GET_ALL_QUESTIONS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.GET_ALL_QUESTIONS_FAILED,
      payload: error
    })
  }
}

export const createQuestion = (dataParams) => async(dispatch) => {
  try {
    dispatch({
      type: types.POST_QUESTION_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await postQuestionService(dataParams)

    dispatch({
      type: types.POST_QUESTION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.POST_QUESTION_FAILED,
      payload: error
    })
  }
}

export const deleteQuestion = (id) => async(dispatch) => {
  try {
    dispatch({
      type: types.DELETE_QUESTION_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await deleteQuestionService(id)

    dispatch({
      type: types.DELETE_QUESTION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_QUESTION_FAILED,
      payload: error
    })
  }
}

export const updateQuestion = (dataParams, id) => async(dispatch) => {
  try {
    dispatch({
      type: types.UPDATE_QUESTION_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await updateQuestionService(dataParams,id)

    dispatch({
      type: types.UPDATE_QUESTION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.UPDATE_QUESTION_FAILED,
      payload: error
    })
  }
}

export const clearQuestion = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_QUESTION
  })
}

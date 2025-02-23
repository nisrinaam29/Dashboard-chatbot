import * as types from '@/constants/types'
import {
  deleteCategoriesService,
  getAllCategoriesService,
  getCategoryByIDService,
  postCategoriesService,
  updateCategoryService
} from '@/services/categories'

export const getAllCategories =
  (page = '1', search = '') =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: types.GET_ALL_CATEGORIES_LOADING,
        payload: {
          loading: true
        }
      })

      const data = await getAllCategoriesService(page, search)

      dispatch({
        type: types.GET_ALL_CATEGORIES_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: types.GET_ALL_CATEGORIES_FAILED,
        payload: error
      })
    }
  }

export const postCategory = (dataParams: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: types.POST_CATEGORY_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await postCategoriesService(dataParams)

    dispatch({
      type: types.POST_CATEGORY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.POST_CATEGORY_FAILED,
      payload: error
    })
  }
}

export const deleteCategory = (id: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: types.DELETE_CATEGORY_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await deleteCategoriesService(id)

    dispatch({
      type: types.DELETE_CATEGORY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_CATEGORY_FAILED,
      payload: error
    })
  }
}

export const updateCategory = (dataParams: any, id: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: types.UPDATE_CATEGORY_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await updateCategoryService(dataParams, id)

    dispatch({
      type: types.UPDATE_CATEGORY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.UPDATE_CATEGORY_FAILED,
      payload: error
    })
  }
}

export const getCategoryByID = id => async dispatch => {
  try {
    dispatch({
      type: types.GET_CATEGORY_BY_ID_LOADING,
      payload: {
        loading: true
      }
    })

    const data = await getCategoryByIDService(id)

    dispatch({
      type: types.GET_CATEGORY_BY_ID_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.GET_CATEGORY_BY_ID_FAILED,
      payload: error
    })
  }
}

export const clearCategory = () => dispatch => {
  dispatch({
    type: types.CLEAR_CATEGORY
  })
}

export const setSelectedID = id => dispatch => {
  dispatch({
    type: types.SET_SELECTED_ID,
    payload: {
      selectedID: id
    }
  })
}

import { instance } from '../axios'
import { categoriesPath } from '../path'

export const getAllCategoriesService = async (page, search) => {
  return instance({
    url: `${categoriesPath}?page=${page}&search=${search}`,
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const postCategoriesService = async data => {
  return instance({
    url: categoriesPath,
    method: 'POST',
    data
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const deleteCategoriesService = async id => {
  return instance({
    url: `${categoriesPath}/${id}`,
    method: 'DELETE'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const updateCategoryService = async (data, id) => {
  return instance({
    url: `${categoriesPath}/${id}`,
    method: 'PUT',
    data
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const getCategoryByIDService = async id => {
  return instance({
    url: `${categoriesPath}/${id}`,
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

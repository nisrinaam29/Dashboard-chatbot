import { instance } from '../axios'
import { questionsPath } from '../path'

export const getAllQuestionsService = async (page, search) => {
  return instance({
    url: `${questionsPath}?page=${page}&search=${search}`,
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const postQuestionService = async data => {
  return instance({
    url: questionsPath,
    method: 'POST',
    data
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const deleteQuestionService = async id => {
  return instance({
    url: `${questionsPath}/${id}`,
    method: 'DELETE'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const updateQuestionService = async (data, id) => {
  return instance({
    url: `${questionsPath}/${id}`,
    method: 'PUT',
    data
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

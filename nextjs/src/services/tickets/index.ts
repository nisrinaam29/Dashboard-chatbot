import { instance } from '../axios'
import { PhoneNumberPath, ticketsPath } from '../path'

export const getTicketsService = async (status = '', category = '', page: number = 1, search: string = '', time: string = 'newest') => {
  return instance({
    url: `${ticketsPath}?status=${status}&category=${category}&page=${page}&search=${search}&time=${time}`,
    method: 'GET'
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const getMessagesService = async (uid = '') => {
  return instance({
    url: `${ticketsPath}/${uid}`,
    method: 'GET',  
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const putTicketActiveService = async (uid='')=>{
  return instance({
    url: `${ticketsPath}/active/${uid}`,
    method:'PUT'
  })
  .then(res=>res.data)
  .catch(err=>{
    throw err.response.data
  })
}

export const putTicketCompleteService = async (uid='')=>{
  return instance({
    url: `${ticketsPath}/complete/${uid}`,
    method:'PUT'
  })
  .then(res=>res.data)
  .catch(err=>{
    throw err.response.data
  })
}

// Function to send a message
export const postMessagesService = async (uid = '', messageData = '') => {
  return instance({
    url: `${ticketsPath}/${uid}`,
    method: 'POST', // Or PUT if updating
    data: messageData // The message data to send
  }).then(res => res.data)
    .catch(err => {
      throw err.response.data
    })
}

export const getPhoneNumber = async (uid='')=>{
  return instance({
    url: `${PhoneNumberPath}/${uid}`,
    method: 'GET',
  }).then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}

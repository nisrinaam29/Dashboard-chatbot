import type { Dispatch } from 'react'

import * as types from '@/constants/types'
import { getTicketsService, putTicketCompleteService, putTicketActiveService } from '@/services/tickets'

export const getTickets = ( status: string,page: number = 1, search: string = '',category: string = '', time: string = 'newest') => async (dispatch:any) => {
  try {
    dispatch({
      type: types.GET_TICKETS_LOADING,
      payload: {
        loading: true
      }
    })
    const data = await getTicketsService(status, category, page, search, time);
    dispatch({
      type: types.GET_TICKETS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: types.GET_TICKETS_ERROR,
      payload: error
    })
  }
}

export const setFilter = (filter:any)=>(dispatch:any)=>{
  dispatch({
    type: types.SET_FILTER,
    payload:{
      filter:filter
    }
  })
}


export const putTicketCompletes = (uid:string)=>async(dispatch:any) =>{
  try{
    dispatch({
      type: types.PUT_TICKETS_COMPLETE_LOADING,
      payload:{
        loading:true
      }
    })

    const data = await putTicketCompleteService(uid,)

    dispatch({
      type: types.PUT_TICKETS_COMPLETE_SUCCESS,
      payload: data
    })

  }catch(error){
    dispatch({
      type: types.PUT_TICKETS_COMPLETE_ERROR,
      payload:error
    })
  }
}
export const putTicketActives = (uid:string)=>async(dispatch:any) =>{
  try{
    dispatch({
      type: types.PUT_TICKETS_ACTIVE_LOADING,
      payload:{
        loading:true
      }
    })

    const data = await putTicketActiveService(uid)

    dispatch({
      type: types.PUT_TICKETS_ACTIVE_SUCCESS,
      payload: data
    })

  }catch(error){
    dispatch({
      type: types.PUT_TICKETS_ACTIVE_ERROR,
      payload:error
    })
  }
}


export const clearTicket = () => (dispatch:any) => {
  dispatch({
    type: types.CLEAR_TICKET,
  })
}
export const clearFilter = () => (dispatch:any) => {
  dispatch({
    type: types.CLEAR_FILTER,
  })
}


/* eslint-disable import/order */
import React, { useEffect, useState } from 'react'
import 'moment-timezone'

import { CircularProgress } from '@mui/material'
import '@/app/globals.css'
import { formatDate } from './ChatInterface'
import { useSelector } from 'react-redux'

export default function ProfileSender() {
  const { data, loading } = useSelector((state: any) => state.messages)

  const [dataDetail, setDataDetail] = useState({
    ticketcode: '',
    number: '',
    status: '',
    reqsub: '',
    category:''
  })

  useEffect(() => {
    if (data?.success) {
      setDataDetail({
        ticketcode: data?.data?.ticketcode,
        number: data?.data?.number,
        status: data?.data?.status,
        reqsub: data?.data?.reqsub,
        category:data?.data?.category
      })
    }
  }, [data?.success])

  return loading && dataDetail.ticketcode == '' ? (
    <div className='flex w-full h-full justify-center items-center self-center'>
      <CircularProgress />
    </div>
  ) : (
    <div className='relative p-5 '>
      <p className='text-xl font-bold py-2'>Ticket Details</p>
      <div className='flex border-b py-2'>
        <p className='min-w-36 '>Ticket code</p>
        <p className='font-semibold'>{dataDetail?.ticketcode}</p>
      </div>
      <div className='flex border-b py-2'>
        <p className='min-w-36 '>Phone Number</p>
        <p className='font-semibold'>{dataDetail?.number}</p>
      </div>
      <div className='flex border-b py-2'>
        <p className='min-w-36 '>Kategori</p>
        <p className='font-semibold'>{dataDetail?.category}</p>
      </div>
      <div className='flex border-b py-2'>
        <p className='min-w-36  '>Status</p>
        <span
          className={
            dataDetail?.status === 'complete' ? 'text-green-700' : dataDetail?.status === 'active' ? 'text-sky-500' : ''
          }
        >
          {dataDetail?.status}
        </span>
      </div>
      <div className='flex  py-2'>
        <p className='min-w-36  '>Request Submitted</p>
        <span>{formatDate(dataDetail?.reqsub)}</span>
      </div>
    </div>
  )
}

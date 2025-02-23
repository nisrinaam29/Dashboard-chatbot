'use client'
import React, { useEffect, useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import { getTickets } from '@/redux/features/tickets/action'
import { getWidgets } from '@/redux/features/widgets/action'
import { dirxml } from 'console'
import Excel from 'exceljs'
import { Button } from '@mui/material'
import path from 'path'
import { clearExport, getExport } from '@/redux/features/exports/action'

export default function ExportTicket() {
  const { data, error, loading } = useSelector((state: any) => state.exports)
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(getExport())
    return dispatch(clearExport())
  }, [])

  return (
    <div className='relative px-4 flex h-20 justify-between items-center'>
      <p className='font-bold'>Unduh Recap Tiket</p>
        <Button href={data?.data} variant='contained' color='primary' >
        {loading ? 'Loading...' : 'Download'}
        </Button>
    </div>
  )
}

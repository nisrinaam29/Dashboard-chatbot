'use client'
import React, { useEffect, useState, useMemo } from 'react'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { Button, CircularProgress, Pagination } from '@mui/material'

import TableTicketWithSearch from '@/components/layout/table/TableTicketWithSearch'
import WidgetList from '@/components/Widget/WidgetList'
import styles from '@core/styles/table.module.css'
import { getTickets, putTicketActives, clearTicket } from '@/redux/features/tickets/action'
import { formatDate } from '@/components/LiveChat/ChatInterface'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'

function Page() {
  const [filters, setFilters] = useState('')
  const [valuePage, setValuePage] = useState(1)
  const [category, setCategory] = useState('')
  const { data, error, loading, filter } = useSelector((state: any) => state.tickets)
  const dispatch: any = useDispatch()
  const { search } = useSelector((state: any) => state.general)
  const router = useRouter()
  // console.log(data)
  // const handleUpdateTicket = () => {
  //   dispatch(getTickets('non-active', valuePage, search, filter.category, filter.time))
  // }

  useEffect(() => {
    dispatch(getTickets('non-active', valuePage, search, filter.category, filter.time))

    socket.on('connect', () => {
      console.log('connect')
    })
    socket.on('update-ticket', () => {
      dispatch(getTickets('non-active', valuePage, search, filter.category, filter.time))
    })

    return () => {
      socket.off('connect', () => {
        console.log('disconnect')
      })
      // dispatch(clearTicket())
    }
  }, [filter.category, valuePage, search, filter.time, dispatch])
  // useEffect(() => {
  //   // console.log('useEffect triggered')
  //   dispatch(getTickets('non-active', valuePage, search, filter.category, filter.time))

  //   if (typeof window !== 'undefined') {
  //     console.log('testing')
  //     dispatch(getTickets('non-active', valuePage, search, filter.category, filter.time))

  //     socket.on('connect', () => {
  //       console.log('Socket connected')
  //     })

  //     socket.on('update-ticket', () => {
  //       console.log('Ticket updated')
  //       dispatch(getTickets('non-active', valuePage, search, filter.category, filter.time))
  //     })

  //     return () => {
  //       socket.off('connect')
  //       socket.off('update-ticket')
  //     }
  //   }
  // }, [filter.category, valuePage, search, filter.time, dispatch, data])
  

  const handleAccept = (ticketId: string) => {
    dispatch(putTicketActives(ticketId))
  }

  const handleChangePagination = (event: any, value: any) => {
    setValuePage(value)
  }
  useEffect(() => {
    setValuePage(1)
  }, [search])

  const memoizedWidgetList = useMemo(
    () => (
      <div className='w-full lg:w-[280px] flex lg:flex-col gap-[24px]'>
        <WidgetList page='pending' />
      </div>
    ),
    []
  )

  return (
    <div className='flex w-full flex-col lg:flex-row gap-[10px] h-[600px] lg:h-[500px]'>
      {/* Table Container */}
      <div className='flex-grow'>
        <TableTicketWithSearch type={'ONGOING'}>
          {loading ? (
            <div className='flex justify-center items-center mb-4 h-full'>
              <CircularProgress />
            </div>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Phone Number</th>
                    <th>Kategori</th>
                    <th>Request Submitted</th>
                    <th className=''>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.tickets?.length > 0 ? (
                    data.data.tickets.map((item: any, index: any) => (
                      <tr key={item?.uid}>
                        <td>{data?.data?.offset + index + 1}</td>
                        <td className='text-xs'>{item?.phone_number}</td>
                        <td className='text-xs'>{item?.category}</td>
                        <td className='text-xs'>{formatDate(item.request_submitted)}</td>
                        <td className='text-xs'>
                          <Link onClick={() => handleAccept(item.id)} href={`/admin/livechat/${item.id}`}>
                            <Button color='success' className='hover:bg-transparent p-0'>
                              Accept
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='text-center'>
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </>
          )}
          <div className='flex justify-center mt-12'>
            <Pagination
              count={data?.data?.totalPage || 0}
              variant='tonal'
              shape='rounded'
              color='primary'
              page={valuePage}
              onChange={handleChangePagination}
              className='flex absolute bottom-5'
            />
          </div>
        </TableTicketWithSearch>
      </div>

      {memoizedWidgetList}
    </div>
  )
}

export default Page

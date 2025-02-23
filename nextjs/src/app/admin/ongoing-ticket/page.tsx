'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { formatDate } from '@/components/LiveChat/ChatInterface'
import Link from 'next/link'
import { Button, CircularProgress, Pagination } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from '@/@core/components/mui/Chip'
import WidgetList from '@/components/Widget/WidgetList'
import TableTicketWithSearch from '@/components/layout/table/TableTicketWithSearch'
import styles from '@core/styles/table.module.css'
import { clearTicket, getTickets } from '@/redux/features/tickets/action'
import { clearSearch } from '@/redux/features/general/action'

function Page() {
  const { data, filter } = useSelector((state: any) => state.tickets)
  const dispatch: any = useDispatch()

  const [tableLoading, setTableLoading] = useState(false)
  const [valuePage, setValuePage] = useState(1)
  const { search } = useSelector((state: any) => state.general)

  useEffect(() => {
    // setTableLoading(true);
    dispatch(getTickets('active', valuePage, search, filter.category, filter.time))
  }, [filter.category, filter.time, valuePage, search])
  const handleChangePagination = (event: any, value: any) => {
    setValuePage(value)
  }

  useEffect(() => {
    setValuePage(1)
  }, [search])

  useEffect(() => {
    return () => {
      dispatch(clearTicket())
    }
  }, [])

  const memoizedWidgetList = useMemo(
    () => (
      <div className='flex justify-between gap-[24px]'>
        <WidgetList page='ongoing' />
      </div>
    ),
    [data?.success]
  )

  return (
    <div className='flex flex-col gap-[18px]'>
      {memoizedWidgetList}
      <div className=''>
        <TableTicketWithSearch type={'ONGOING'}>
          {tableLoading ? (
            <div className='flex justify-center items-center mb-4 h-full'>
              <CircularProgress />
            </div>
          ) : (
            <div className='overflow-auto'>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Phone Number</th>
                    <th>Status</th>
                    <th>Ticket Code</th>
                    <th>Kategori</th>
                    
                    <th>Request Submitted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {data?.data?.tickets?.length > 0 ? (
                    data.data.tickets.map((item: any, index: any) => (
                      <tr key={item?.uid}>
                        <td>{data?.data?.offset + index + 1}</td>
                        <td className='text-zxs'>{item?.phone_number}</td>
                        <td className='text-xs'>
                          <CustomChip round='true' size='small' label={item.status} color='success' />
                        </td>
                        <td className='text-xs'>{item.ticket_code}</td>
                        <td className='text-xs'>{item.category}</td>

                        <td className='text-xs'>{formatDate(item.request_submitted)}</td>
                        <td className='text-xs'>
                          <a href={`/admin/livechat/${item.id}`}>
                            <Button className='hover:bg-transparent p-0'>Live Chat</Button>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className='text-center'>
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className='flex justify-center pb-2'>
            <Pagination
              count={data?.data?.totalPage || 1} // Add a default value to avoid undefined issues
              variant='tonal'
              shape='rounded'
              color='primary'
              onChange={handleChangePagination}
              page={valuePage}
            />
          </div>
        </TableTicketWithSearch>
      </div>
    </div>
  )
}

export default Page

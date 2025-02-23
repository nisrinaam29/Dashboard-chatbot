'use client'

import React, { useEffect, useState } from 'react'
import TableTicketWithSearch from '@/components/layout/table/TableTicketWithSearch'
import Link from 'next/link'
import { Button, Card, CircularProgress, Pagination } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from '@/@core/components/mui/Chip'
import { formatDate } from '@/components/LiveChat/ChatInterface'
import { clearTicket, getTickets } from '@/redux/features/tickets/action'
import styles from '@core/styles/table.module.css'
import { clearSearch } from '@/redux/features/general/action'

function Page() {
  const [valuePage, setValuePage] = useState(1)
  const { data, loading, filter } = useSelector((state: any) => state.tickets)
  const dispatch: any = useDispatch()
  const { search } = useSelector((state: any) => state.general)


  useEffect(() => {
    dispatch(getTickets('complete', valuePage, search, filter.category ,filter.time))
  
  }, [filter.category, filter.time, valuePage, search]);

  useEffect(()=>{
    setValuePage(1)

  },[search])
 

  const handleChangePagination = (event: any, value: any) => {
    setValuePage(value)
  }
  return (
    <div className='flex flex-col gap-8 justify-end items-end'>
      <Card className='w-full bg-transparent'>
        <TableTicketWithSearch type='HISTORY'>
          {loading ? (
            <div className='flex justify-center items-center'>
              <CircularProgress />
            </div>
          ) : data?.data?.tickets?.length > 0 ? (
            <div className='grid grid-cols-4 gap-4 px-6'>
              {data?.data?.tickets?.map((item: any, index: any) => (
                <Card className='flex flex-col p-4 gap-1 hover:bg-purple-50' key={index}>
                  <div className=''>
                    <CustomChip round='true' size='small' label={item.status} className='bg-red-500 text-white' />
                  </div>
                  <p className='pt-1'>{item.phone_number}</p>
                  <p className='pt-1'>{item.category}</p>
                  <p className='text-lg font-bold'>{item.ticket_code}</p>
                  <p className='font-bold'>{formatDate(item.request_submitted)}</p>

                  <Link className='flex justify-end' href={`/admin/livechat/${item.id}`}>
                    <Button size='small'>
                      See Details <span className='flex items-center tabler-chevron-right size-4'></span>
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className='flex justify-center items-center h-64'>
              <p className=''>No Data Available</p>
            </div>
          )}
          <div className='flex justify-center p-8'>
            <Pagination
              count={data?.data?.totalPage}
              variant='tonal'
              shape='rounded'
              color='primary'
              onChange={handleChangePagination}
              page={valuePage}

            />
          </div>
        </TableTicketWithSearch>
      </Card>
    </div>
  )
}

export default Page

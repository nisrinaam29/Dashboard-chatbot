import React from 'react'
import { Button, Card, CardHeader } from '@mui/material'
import TableTicketWithSearch from '@/components/layout/table/TableTicketWithSearch'
import button from '@/@core/theme/overrides/button'
import WidgetList from '@/components/Widget/WidgetList'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserLoggedIn } from '@/redux/features/user/action'
import Profile from '@/components/Settings/Profile'
import ExportTicket from '@/components/ExportTicket'
function Page() {
  return (
    <div className='flex gap-4 justify-end'>
      <div className='flex flex-col w-full gap-4 '>
        <Card>
          
          <ExportTicket />
        </Card>
        <Card className=''>

          <CardHeader className='' title='Settings' />
          <div className='p-4 grid grid-cols-2 gap-4'>

            <WidgetList page='settings' />
          </div>
            
        </Card>
      </div>
      <Profile />
    </div>
  )
}
export default Page

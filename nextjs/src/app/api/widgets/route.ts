// import { onValue } from "firebase/database";
// import { chatRef } from "../../../../firebase-config";
import type { NextRequest } from 'next/server'

import { Op } from 'sequelize'

import { jwtDecode } from 'jwt-decode'

import generalResponse from '@/libs/generalResponse'
import Ticket from '@/libs/models/Ticket'
import type { UserTypes } from '@/types/UserTypes'
import User from '@/libs/models/User'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization') || ''
  const decoded: UserTypes = jwtDecode(token)

  const user = await User.findOne({
    where: { id: decoded.id }
  })

  let totalTaskCount = 0
  let totalActiveCount = 0
  let totalCompleteCount = 0
  let totalPendingCount = 0

  try {
    totalTaskCount = await Ticket.count({
      where: { ro: user?.ro }
    })
    totalActiveCount = await Ticket.count({
      where: { ro: user?.ro, status: 'active' }
    })
    totalPendingCount = await Ticket.count({
      where: { ro: user?.ro, status: 'non-active' }
    })
    totalCompleteCount = await Ticket.count({
      where: { ro: user?.ro, status: 'complete' }
    })

    const ongoing = [
      {
        icon: 'tabler-sum',
        number: totalTaskCount,
        title: 'Total Semua Tiket',
        desc: '* Total semua tiket',
        color: ' bg-sky-900'
      },
      {
        icon: 'tabler-clipboard-list',
        number: totalActiveCount,
        title: 'Total Tiket Aktif',
        desc: '* Total tiket yang sedang aktif',
        color: ' bg-sky-500'
      },
      {
        icon: 'tabler-checks',
        number: totalCompleteCount,
        title: 'Total Tiket Selesai',
        desc: '* Total tiket yang sudah selesai',
        color: ' bg-green-700'
      }
    ]

    const pending = [
      {
        icon: 'tabler-sum',
        number: totalTaskCount,
        title: 'Total Semua Tiket',
        desc: '* Total semua tiket',
        color: ' bg-sky-900'
      },
      {
        icon: 'tabler-rotate-clockwise-2',
        number: totalPendingCount,
        title: 'Total Tiket Pending',
        desc: '* Total tiket yang belum aktif',
        color: ' bg-yellow-400'
      },
      {
        icon: 'tabler-checks',
        number: totalCompleteCount,
        title: 'Total Tiket Selesai',
        desc: '* Total tiket yang sudah selesai',
        color: ' bg-green-700'
      }
    ]

    const settings = [
      {
        icon: 'tabler-sum',
        number: totalTaskCount,
        title: 'Total Semua Tiket',
        desc: '* Total semua tiket',
        color: ' bg-sky-900'
      },
      {
        icon: 'tabler-clipboard-list',
        number: totalActiveCount,
        title: 'Total Tiket Aktif',
        desc: '* Total tiket yang sedang aktif',
        color: ' bg-sky-500'
      },
      {
        icon: 'tabler-rotate-clockwise-2',
        number: totalPendingCount,
        title: 'Total Tiket Pending',
        desc: '* Total tiket yang belum aktif',
        color: ' bg-yellow-400'
      },
      {
        icon: 'tabler-checks',
        number: totalCompleteCount,
        title: 'Total Tiket Selesai',
        desc: '* Total tiket yang sudah selesai',
        color: ' bg-green-700'
      }
    ]

    // return generalResponse(200, true, 'OK', {totalActiveCount,totalPendingCount,totalTaskCount} )
    return generalResponse(200, true, 'OK', { ongoing, pending, settings })

    // return generalResponse(200, true, 'OK', totalTaskCount )
  } catch (error) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

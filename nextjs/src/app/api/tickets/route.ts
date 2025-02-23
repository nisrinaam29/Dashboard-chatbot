'use server'
import type { NextRequest } from 'next/server'

import { Op } from 'sequelize'

import { jwtDecode } from 'jwt-decode'

import generalResponse from '@/libs/generalResponse'
import Ticket from '@/libs/models/Ticket'
import type { UserTypes } from '@/types/UserTypes'
import User from '@/libs/models/User'
import { socket } from '@/socket'
import Category from '@/libs/models/Category'

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') || ''
  const search = decodeURIComponent(req.nextUrl.searchParams.get('search') || '').trim()
  const pageString = req.nextUrl.searchParams.get('page')
  const page = Number(pageString)
  const time = req.nextUrl.searchParams.get('time') || 'newest'
  const categoryParam = req.nextUrl.searchParams.get('category') || ''
  const categories = categoryParam ? categoryParam.split(',') : []

  try {
    const limit = status === 'complete' ? 8 : 6

    let totalCount = 0
    const offset = (page - 1) * limit

    let tickets = null

    const token = req.headers.get('authorization') || ''
    const decoded: UserTypes = jwtDecode(token)

    const user: any = await User.findOne({
      where: { id: decoded.id }
    })
  
    const cat: any=await Category.findOne({
      where:{id:user?.category_id}
    })
    console.log(cat?.name)
    if (pageString == 'all') {
      totalCount = await Ticket.count()
      tickets = await Ticket.findAll()
    } else {
      const whereClause = {
        [Op.and]: [
          {
            [Op.or]: [
              {
                ticket_code: {
                  [Op.like]: '%' + search.toLowerCase() + '%'
                }
              },
              {
                phone_number: {
                  [Op.like]: '%' + search.toLowerCase() + '%'
                }
              },
              {
                category: {
                  [Op.like]: '%' + search.toLowerCase() + '%'
                }
              }
            ]
          },
          {
            status: status,
            category:cat?.name,
            ro: user?.ro
          },
          ...(categories.length > 0 ? [{ category: { [Op.in]: categories } }] : [])
        ]
      }

      tickets = await Ticket.findAll({
        where: whereClause,
        order: time === 'oldest' ? [['request_submitted', 'ASC']] : [['request_submitted', 'DESC']], // Sort by request_submitted
        offset: offset,
        limit: limit
      })

      totalCount = await Ticket.count({
        where: whereClause
      })
    }

    const totalPage = Math.ceil(totalCount / limit)

    return generalResponse(200, true, 'OK', {
      tickets,
      limit,
      page,
      offset,
      totalPage
    })
  } catch (error: any) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

export async function POST() {
  try {
    socket.emit('new_ticket')

    return generalResponse(200, true, 'OK', null)
  } catch (error: any) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

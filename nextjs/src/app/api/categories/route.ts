import type { NextRequest } from 'next/server'

import { Op } from 'sequelize'

import Category from '@/libs/models/Category'
import generalResponse from '@/libs/generalResponse'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || ''
  const pageParam = req.nextUrl.searchParams.get('page')

  try {
    let limit = 5
    let offset = 0

    if (pageParam === 'all') {
      limit = 10000
    } else {
      const page = Number(pageParam) || 1

      offset = (page - 1) * limit
    }

    const whereCondition = {
      [Op.or]: [
        {
          text: {
            [Op.like]: '%' + search.toLowerCase() + '%'
          }
        },
        {
          name: {
            [Op.like]: '%' + search.toLowerCase() + '%'
          }
        }
      ]
    }

    const categories = await Category.findAll({
      where: whereCondition,
      offset: pageParam === 'all' ? undefined : offset,
      limit: pageParam === 'all' ? undefined : limit
    })

    const totalCount = await Category.count({
      where: whereCondition
    })

    const totalPage = Math.ceil(totalCount / limit)

    return generalResponse(200, true, 'OK', {
      categories,
      limit,
      page: pageParam,
      offset,
      totalPage
    })
  } catch (error: any) {
    return generalResponse(500, false, error.message || 'Internal Server Error')
  }
}

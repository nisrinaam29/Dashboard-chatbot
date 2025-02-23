import type { NextRequest } from 'next/server'

import { Op } from 'sequelize'

import generalResponse from '@/libs/generalResponse'
import User from '@/libs/models/User'
import { timeConverter } from '@/libs/timeConverter'
import { encryptor } from '@/utils/cryptograph'

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get('search') || ''

    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: '%' + search.toLowerCase() + '%' // Using case-insensitive search
        }
      }
    })

    const usersResponse = users.map(item => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, email, role_id, birth_date, inspection_date, id, ...anotherResponse } = item.toJSON()

      return {
        ...anotherResponse,
        id: encryptor(id?.toString()),
        birth_date: timeConverter(birth_date as string),
        inspection_date: timeConverter(inspection_date as string)
      }
    })

    return generalResponse(200, true, 'OK', usersResponse)
  } catch (error: any) {
    return generalResponse(500, false, error.message || 'Internal Server Error')
  }
}

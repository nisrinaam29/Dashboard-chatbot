import type { NextRequest } from 'next/server'

import { Op } from 'sequelize'

import generalResponse from '@/libs/generalResponse'
import Category from '@/libs/models/Category'
import Questions from '@/libs/models/Question'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || ''
  const page = Number(req.nextUrl.searchParams.get('page')) || 1

  try {
    const limit = 5
    const offset = (page - 1) * limit

    const whereCondition = {
      [Op.or]: [
        {
          text: {
            [Op.like]: '%' + search.toLowerCase() + '%'
          }
        },
        {
          answer: {
            [Op.like]: '%' + search.toLowerCase() + '%'
          }
        }
      ]
    }

    // const totalCount = await Questions.count();

    // Fetch questions with search criteria and pagination
    const questions: any[] = await Questions.findAll({
      where: whereCondition,
      include: {
        model: Category,
        as: 'category'
      },
      offset: offset,
      limit: limit
    })

    const questionsWithoutCategoryId = questions.map((question: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { category_id, ...rest } = question.toJSON()

      return rest
    })

    // Count total number of questions matching the search criteria
    const totalCount = await Questions.count({
      where: whereCondition
    })

    const totalPage = Math.ceil(totalCount / limit)

    return generalResponse(200, true, 'OK', {
      questions: questionsWithoutCategoryId,
      limit,
      page,
      offset,
      totalPage
    })
  } catch (error: any) {
    return generalResponse(500, false, error.message || 'Internal Server Error')
  }
}

export async function POST(req: Request) {
  try {
    const { text, answer, category_id } = await req.json()

    if (!category_id) return generalResponse(404, false, 'Wajib ada kategori!', {})
    if (!text) return generalResponse(404, false, 'Wajib isi pertanyaan!', {})
    if (!answer) return generalResponse(404, false, 'Wajib jawaban pertanyaan!', {})

    const allQuestions = await Questions.findAll({
      where: {
        category_id: category_id
      }
    })

    await Questions.create({
      text: text,
      answer: answer,
      category_id: category_id,
      number: allQuestions.length + 1
    })

    return generalResponse(200, true, 'Berhasil membuat pertanyaan', {})
  } catch (error: any) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { v4 as uuidv4 } from 'uuid' // Import UUID function

import { io } from 'socket.io-client'

import axios from 'axios'

import Messages from '@/libs/models/Messages'
import generalResponse from '@/libs/generalResponse'
import Ticket from '@/libs/models/Ticket'
import UserWa from '@/libs/models/UserWa'

const socket = io('https://.ngrok-free.app', {
  transports: ['websocket']
}) //ngrok url

export async function POST(req: NextRequest, { params }: { params: { chat: string } }) {
  const role = req.nextUrl.searchParams.get('role') || 'agent'

  try {
    const { chat: ticketId } = params

    const { message } = await req.json()

    const ticket: any = await Ticket.findOne({
      where: {
        id: ticketId
      }
    })

    if (role == 'agent') {
      await axios.post('https://.ngrok-free.app/message?role=admin', {
        message,
        phone_number: ticket?.phone_number || ''
      }) //ngrok api endpoint from backend flask

      socket.emit('updateMessage')
    }

    const message_id = uuidv4()
    const date = new Date()

    const messages = await Messages.create({
      id: message_id,
      ticket_id: ticketId,
      message: message,
      role: role,
      updated_at: date.toString()
    })

    if (message.toLowerCase().includes('closed ticket')) {
      await Ticket.update({ status: 'complete' }, { where: { id: ticketId } })

      await UserWa.update({ status: '0' }, { where: { phone_number: ticket?.phone_number } })
      socket.emit('updateMessage')
    }

    socket.emit('updateMessage')

    return generalResponse(200, true, 'Message posted successfully', messages)
  } catch (error: any) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

export async function GET(req: Request, { params }: { params: { chat: string } }) {
  try {
    const { chat: ticketId } = params

    if (!ticketId) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'Ticket ID is required'
      })
    }

    const messages = await Messages.findAll({
      where: {
        ticket_id: ticketId

      },
      order: [['updated_at', 'ASC']]
    })

    // if (messages.length === 0) {
    //   return NextResponse.json({
    //     status: 404,
    //     success: false,
    //     message: 'No messages found for the given ticket ID'
    //   })
    // }
    const ticketInfo: any = await Ticket.findOne({
      where: {
        id: ticketId
      },
      attributes: ['phone_number', 'status', 'category', 'request_submitted', 'ticket_code']
    })

    const number = ticketInfo ? ticketInfo.phone_number : null
    const status = ticketInfo ? ticketInfo.status : null
    const category = ticketInfo ? ticketInfo.category : null
    const reqsub = ticketInfo ? ticketInfo.request_submitted : null
    const ticketcode = ticketInfo ? ticketInfo.ticket_code : null

    return generalResponse(200, true, 'Messages fetched successfully', {
      messages,
      number,
      status,
      category,
      reqsub,
      ticketcode
    })
  } catch (error: any) {
    return generalResponse(500, false, error?.message || 'Internal Server Error')
  }
}

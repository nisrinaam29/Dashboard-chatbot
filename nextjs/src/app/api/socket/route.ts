import type { NextApiResponse } from 'next'
import { Server } from 'socket.io'

export async function POST(req, res: NextApiResponse) {
  console.log('res', res)

  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)

    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })
    })
  }

  res.end()
}

'use client'

import { io } from 'socket.io-client'

export const socket = io('https://.ngrok-free.app', {
  transports: ['websocket']
}) /*ngrok url;*/

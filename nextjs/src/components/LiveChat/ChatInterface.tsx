/* eslint-disable import/order */
'use client'
import React, { useRef, useEffect, useState } from 'react'
import 'moment-timezone'
import Refresh from '@/components/Refresh'
import { Button, Card, CircularProgress } from '@mui/material'
import '@/app/globals.css'

import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import ProgressCircularWithLabel from '../Progress/load'
import { getMessages, postMessages } from '@/redux/features/messages/action'

import { useRouter } from 'next/navigation'
import { socket } from '@/socket'

const formatTime = (timestamp: any) => {
  return moment(timestamp).format('h:mm A') // Convert to local time
}

export const formatDate = (dateString: any, timeZone = 'Asia/Jakarta') => {
  // Parse the date string into a moment object
  const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss')

  // Convert the date to the desired timezone
  const zonedDate = date.tz(timeZone)

  // Format the date and time in DD/MM/YYYY HH:mm:ss format
  return zonedDate.format('DD/MM/YYYY HH:mm:ss')
}

const messageButton = [
  'Closed ticket',
  'Terima kasih sudah menghubungi kami!',
  'Ada yang bisa saya bantu?',
  'Baik kalau begitu, prosedur yang dapat dilakukan adalah',
  'Jika tidak, silahkan ketik complete',
  'Anda sudah melewati batas waktu reply agent, agent akan mentutup tiket, terima kasih!'
]

function UserChat({ message, phoneNumber }) {
  return (
    <Card className='relative flex self-start min-w-20 mr-20 mt-2 dark:bg-purple-100 dark:bg-opacity-10 bg-gray-100  '>
      <div className='flex flex-col'>
        <div className='flex border-b px-4 py-1.5 justify-between rounded-t '>{phoneNumber}</div>
        <div className='flex px-4 pb-1.5 flex-col bg-gray-50 dark:bg-slate-400 dark:bg-opacity-20'>
          <p className='break-all'>{message.message}</p>
          <div className='flex justify-end text-xs pt-2'> {formatTime(message.updated_at)}</div>
        </div>
      </div>
      {/* <Card className='relative flex flex-col mt-2 justify-start min-w-40 mr-20 dark:bg-purple-950 dark:bg-opacity-10 bg-gray-100  '> */}
    </Card>
  )
}

function AgentChat({ message }) {
  return (
    <Card className='relative flex flex-col mt-2 self-end ml-20 min-w-40 p-3'>
      {/* <Card className='relative flex flex-col mt-2 self-end max-w-40 min-w-20 p-2 border'> */}
      <div className='relative '>
        <p className='break-all'>
          {message.message}
          {}
        </p>
      </div>
      <div className=' flex justify-end text-xs pt-2'> {formatTime(message.updated_at)}</div>
    </Card>
  )
}

function ChatComponent({ messages, phoneNumber }) {
  const groupedMessages = messages.reduce((acc: any, message: any) => {
    const currentDate = new Date(message.updated_at).toDateString()

    if (!acc[currentDate]) acc[currentDate] = []
    acc[currentDate].push(message)

    return acc
  }, {})

  return (
    <div>
      {Object.keys(groupedMessages).map((date, index) => (
        <div className='relative' key={index}>
          <div className='sticky top-0 flex justify-center z-30'>
            <p className='text-sm my-2 border rounded-full shadow-sm px-2 bg-white'>{date}</p>
          </div>
          {groupedMessages[date].map((msg: any) => (
            <div className='flex flex-col pb-3' key={msg.uid}>
              {msg.role === 'user' ? (
                <UserChat key={msg.uid} message={msg} phoneNumber={phoneNumber} />
              ) : (
                <AgentChat key={msg.uid} message={msg} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function ChatInterface({ slug }) {
  const { data, loading } = useSelector((state: any) => state.messages)
  const [dataMessages, setDataMessages] = useState([])
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)
  const router = useRouter()
  const messagesEndRef = useRef(null)

  // const endOfMessagesRef = useRef(null);

  const handleChange = e => {
    setMessage(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(postMessages(slug, { message }))
    setMessage('')
  }

  useEffect(() => {
    dispatch(getMessages(slug))

    socket.on('connect', () => {
      console.log('connect')
    })

    socket.on('update-value', () => {
      console.log("Received update-value event");

      dispatch(getMessages(slug))
    })

    return () => {
      socket.off('connect')
      socket.off('update-value')
    }
  }, [slug, dispatch, socket])

  const handleButtonClick = (buttonMessage, event) => {
    setMessage(prevMessage => prevMessage + buttonMessage)
    event.target.blur() // Remove focus from the button after click
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Prevent new lines when pressing Enter without Shift
      event.preventDefault()
      handleSubmit(event) // Submit the form
    } else if (event.key === 'Enter' && event.shiftKey) {
      // Allow Shift+Enter for new lines
      event.preventDefault()
      setMessage(prevMessage => prevMessage + '\n')
    }
  }

  useEffect(() => {
    const dataMessagesAdded: any[] =
      data?.data?.messages?.filter(
        message => !dataMessages?.some(existingMessage => existingMessage.id === message.id)
      ) || []

    if (dataMessagesAdded.length > 0) {
      setDataMessages(prev => [...(prev || []), ...dataMessagesAdded])
    } else {
      setDataMessages(data?.data?.messages || [])
    }
  }, [data?.data?.messages])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef?.current?.scrollIntoView()
    }
  }, [dataMessages])

  // const autoResizeTextarea = () => {
  //   const textarea = textareaRef.current

  //   if (textarea) {
  //     textarea.style.height = 'auto'
  //     textarea.style.height = `${textarea.scrollHeight}px`
  //   }
  // }

  const handleClick = () => {
    router.back()
  }

  return (
    <div className='w-2/3 h-[690px] flex flex-col'>
      <div className='border-b sticky top-auto text-lg flex p-4 gap-4'>
        <span className='tabler-chevron-left cursor-pointer' onClick={handleClick}></span>
        {loading ? <CircularProgress /> : <p className='self-center flex flex-grow'>{data?.data?.number}</p>}
      <Refresh/>
      </div>
      <div className='relative flex-1 flex-col px-4 overflow-y-auto py-4'>
        {loading && dataMessages.length == 0 ? (
          <div className='flex  w-full h-full justify-center self-center items-center'>
            <CircularProgress />
          </div>
        ) : (
          <>
            <ChatComponent messages={dataMessages || []} phoneNumber={data?.data?.number} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      <div className='border-t'>
        {data?.data?.status === 'complete' ? (
          <div className='flex py-4 justify-center text-gray-500'>
            <p>The chat is closed and no further messages can be sent.</p>
          </div>
        ) : (
          <div className='flex py-2 pl-2 flex-col md:border-transparent md:dark:border-transparent md:w-full gap-2'>
            <div className='flex overflow-x-scroll gap-2 no-scrollbar pr-2'>
              {messageButton.map((item, index) => (
                <div className='text-nowrap' key={index}>
                  <Button
                    onClick={event => handleButtonClick(item, event)}
                    variant='outlined'
                    className={`border-2 p-1 rounded-full px-5 ${
                      item === 'Closed ticket'
                        ? 'border-red-600 text-red-600 hover:text-white hover:bg-red-600'
                        : 'border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600'
                    }`}
                  >
                    {item}
                  </Button>
                </div>
              ))}
            </div>
            <form className='flex pr-2' onSubmit={handleSubmit}>
              <div className='w-full relative flex items-center'>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder='Enter your message'
                  className='m-0 outline outline-[1px] outline-gray-200 w-full text-lg resize-none rounded-md bg-transparent focus:outline-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-transparent py-2 pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 pl-4 md:pl-6'
                  rows={1}
                />

                <Button type='submit' className='absolute right-2'>
                  <span className='tabler-send size-6'></span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

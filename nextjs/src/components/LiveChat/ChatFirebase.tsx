import React, { useRef, useEffect, useState } from 'react'

import { Button, Card } from '@mui/material'
import '@/app/globals.css'

import { useDispatch, useSelector } from 'react-redux'

import User from '@/libs/models/User'

import { Agent } from 'http'

import ProgressCircularWithLabel from '../Progress/load'
import { getMessages, postMessages } from '@/redux/features/messages/action'
import { distDir } from '../../../next.config.js'

import { useRouter } from 'next/navigation'

const messageButton = [
  'Closed Ticket',
  'Terima Kasih Sudah Menghubungi kami!',
  'Ada yang bisa saya bantu?',
  'Baik Kalau begitu, prosedur yang dapat dilakukan adalah',
  'Jika tidak, silahkan ketik complete',
  'Anda sudah melewati batas waktu reply agent, agent akan mentutup tiket, terima kasih!'
]

function UserChatFirebase({ message, phoneNumber }) {
  return (
    <Card className='flex flex-col mt-2 justify-start w-fit mr-20  '>
      <div className='flex border-b px-4 py-1.5 justify-between rounded-t '>{phoneNumber}</div>
      <div className='flex px-4 pb-1.5 flex-col'>
        <p className='break-all'>{message.message}</p>
        <div className='flex justify-end text-xs pt-2'>{message.updated_at}</div>
      </div>
    </Card>
  )
}

function AgentChatFirebase({ message }) {
  return (
    <Card className='flex flex-col mt-2  self-end w-fit p-2 ml-20'>
      <div className='flex '>
        <p className='break-all'>
          {message.message}
          {}
        </p>
      </div>
      <div className=' flex justify-end text-xs pt-2'>{message.updated_at}</div>
    </Card>
  )
}

function ChatComponentFirebase({ messages, phoneNumber }) {
  const groupedMessages = messages.reduce((acc, message) => {
    const currentDate = new Date(message.updated_at).toDateString()

    if (!acc[currentDate]) acc[currentDate] = []
    acc[currentDate].push(message)

    return acc
  }, {})

  return (
    <div>
      {Object.keys(groupedMessages).map((date, index) => (
        <div className='relative' key={index}>
          <div className='sticky top-0 flex justify-center'>
            <p className='text-sm my-2 border rounded-full shadow-sm px-2'>{date}</p>
          </div>
          {groupedMessages[date].map(msg => (
            <div className='flex flex-col' key={msg.uid}>
              {msg.role === 'user' ? (
                <UserChatFirebase key={msg.uid} message={msg} phoneNumber={phoneNumber} />
              ) : (
                <AgentChatFirebase key={msg.uid} message={msg} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function ChatFirebase({ slug }) {
  const { data, error, loading, createData } = useSelector(state => state.messages)
  const [dataInput, setDataInput] = useState()
  const dispatch: any = useDispatch()

  const [message, setMessage] = useState('')

  const handleChange = (e: any) => {
    setMessage(e.target.value)
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    dispatch(postMessages(slug, { message }))
    setMessage('')

    // try{
    //   const res = await fetch(`/api/tickets/${slug}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message }),
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     setDataInput(data)
    //     alert(data.message);
    //     setMessage(''); // Clear the input field
    //   } else {
    //     alert(`Error: ${data.message}`);
    //   }
    // } catch (error) {
    //   console.error('Error submitting message:', error);
    //   alert('An error occurred while submitting the message.');
    // }
  }

  useEffect(() => {
    dispatch(getMessages(slug))
  }, [createData])

  const [messageInput, setMessageInput] = useState('')
  const textareaRef = useRef(null)

  const handleButtonClick = message => {
    setMessageInput(prevInput => prevInput + message)
  }

  const handleInputChange = event => {
    setMessageInput(event.target.value)
    autoResizeTextarea()
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && event.shiftKey) {
      // Allow new line with Shift+Enter
      event.preventDefault()
      setMessageInput(prevInput => prevInput + '\n')
    } else if (event.key === 'Enter') {
      // Prevent default Enter key behavior
      event.preventDefault()
      handleSubmit(event)
    }
  }


  const autoResizeTextarea = () => {
    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return loading ? (
    <div className='w-2/3 h-[690px] flex  justify-center items-center'>
      <ProgressCircularWithLabel />
    </div>
  ) : (
    <div className='w-2/3 h-[690px] flex flex-col'>
      <div className='border-b  sticky top-auto text-lg flex p-4 gap-4'>
        <span className='tabler-chevron-left' onClick={handleClick}></span>
        <p className='self-center flex'>{data?.data?.phoneNumber}</p>
      </div>
      <div className=' relative flex-1 flex-col px-4  overflow-y-auto py-4'>
        <ChatComponentFirebase messages={data?.data?.messages || []} phoneNumber={data?.data?.phoneNumber} />
      </div>
      <div className='border-t'>
        <div className='flex py-2 pl-2 flex-col md:border-transparent md:dark:border-transparent md:w-full gap-2'>
          <div className='flex overflow-x-scroll gap-2 no-scrollbar pr-2'>
            {messageButton.map((item, index) => (
              <div className='text-nowrap' key={index}>
                <Button
                  onClick={() => handleButtonClick(item)}
                  variant='outlined'
                  className='border-sky-600 border-2 text-sky-600 hover:text-white hover:bg-sky-600 hover:border-sky-600 p-1 rounded-full px-5 hover:shadow-sm'
                >
                  {item}
                </Button>
              </div>
            ))}
          </div>
          <form className='flex pr-2' onSubmit={handleSubmit}>
            <div className='overflow-hidden flex flex-col w-full flex-grow relative border rounded-xl bg-token-main-surface-primary border-token-border-medium'>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder='Enter your message'
                className='m-0 w-full text-lg h-max-[162px] resize-none rounded-md border-0 bg-transparent h-[54px] focus:ring-0 focus-visible:ring-0 dark:bg-transparent py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 pl-4 md:pl-6'
                rows={1} // Start with a single row
              />
              <Button
                type='submit'
                className='absolute bottom-1.5 self-center right-2 p-0.5 transition-colors disabled:opacity-10 md:bottom-3 md:right-3'
              >
                <span className='tabler-send size-6'></span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

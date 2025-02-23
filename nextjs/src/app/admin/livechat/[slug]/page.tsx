'use client'
import React, { useEffect } from 'react'
import { Card } from '@mui/material'
import ChatInterface from '@/components/LiveChat/ChatInterface'
import ProfileSender from '@/components/LiveChat/ProfileSender'
import { useDispatch } from 'react-redux'
import { clearMessages } from '@/redux/features/messages/action'

const Page = ({ params }: { params: { slug: string } }) => {
  const dispatch: any = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(clearMessages())
    }
  }, [])
  return (
    <Card className='flex flex-row rounded-xl'>
      <ChatInterface slug={params.slug} />
      <div className='w-1/3 border-l '>
        <ProfileSender />
      </div>
    </Card>
  )
}

export default Page

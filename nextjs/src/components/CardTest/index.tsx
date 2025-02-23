'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

import { Button, Card, CardActions, CardContent } from '@mui/material'

type CardType = {
  path: string
  title: string
  description: string
  status: number
}

const CardTest: React.FC<CardType> = ({ path, title, description, status }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/instructions/${path}`)
  }

  return (
    <div className={`${status == 1 ? 'bg-base-100' : ''}`}>
      <Card>
        <CardContent>
          <h2>{title}</h2>
          <p className='line-clamp-3'>{description}</p>
        </CardContent>
        <CardActions className='card-actions-dense flex justify-end'>
          <Button variant='text' color='primary'>
            More
          </Button>
          <Button variant='contained' color='primary' onClick={handleClick} disabled={status == 0 ? true:false}>
            Start
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CardTest

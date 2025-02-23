// components/Widget/Widget.tsx
import React from 'react'
import { Card } from '@mui/material'
import clsx from 'clsx'

interface WidgetProps {
  icon: React.ReactNode
  title: string
  number: number
  desc?: string
  color:string
}

const Widget: React.FC<WidgetProps> = React.memo(({ icon, title, number, desc, color }) => {
  return (
    <Card className='flex  p-4 w-full h-36 '>
      <div className=' flex w-full justify-center'>
        <span className={clsx(` self-center size-10  lg:size-24 ${color}`, icon)}></span>
      </div>
    <div className=''>
      <div className='self-center flex w-[0.5px] opacity-30 h-full mr-6 bg-slate-100'></div>
    </div>
      <div className='flex flex-col w-full items-start justify-center lg:gap-1'>
        <h3 className=' text-[12px] lg:text-sm font-semibold'>{title}</h3>
        <p className='text-4xl pl-2'>{number}</p>
        <p className='text-[8px]'>{desc}</p>
      </div>
    </Card>
  )
})

export default Widget

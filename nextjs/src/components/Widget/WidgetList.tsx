'use client';
// components/Widget/WidgetList.tsx
import React, { useEffect } from 'react'
import Widget from '.'
import { widgetConfig } from './WidgetConfig'
import { useDispatch, useSelector } from 'react-redux'
import { getWidgets } from '@/redux/features/widgets/action'

interface WidgetListProps {
  page: keyof typeof widgetConfig
}

const WidgetList = ({ page }) => {
  const { data, loading, error } = useSelector((state: any) => state.widgets)
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(getWidgets())
  }, [])

  return data?.data?.[page].map((item:any, index:any) => (
    <Widget color={item.color} key={index} icon={item.icon} title={item.title} number={item.number} desc={item.desc} />
  ))
}

export default WidgetList

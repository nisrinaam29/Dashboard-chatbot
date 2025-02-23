"use client"

// Component Imports
import { useEffect } from 'react'

import Link from 'next/link'

import classnames from 'classnames'

import { useDispatch, useSelector } from 'react-redux'

import LayoutNavbar from '@/@layouts/components/vertical/Navbar'
import NavToggle from '../horizontal/NavToggle'
import ModeDropdown from './ModeDropdown'
import UserDropdown from './UserDropdown'
import { horizontalLayoutClasses } from '@/@layouts/utils/layoutClasses'
import Logo from './Logo'


import { getUserLoggedIn } from '@/redux/features/user/action'
import type { MenuTypes } from '@/types/MenuTypes'

const Navbar = () => {
  const { data, loading } = useSelector((state: any) => state.user);

  // const dispatch: any = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserLoggedIn());
  // }, []);


  return loading ? null : (
    <LayoutNavbar>
      <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-8'>
        <NavToggle />
        <Logo/>
        {/* <div className='flex gap-4'>
          {data?.data?.menu?.map((item: MenuTypes)=>(
          <Link href={item.url} key={item.id}>{item.title}</Link>
          ))}
        </div> */}
      </div>
      <div className='flex items-center'>
        <ModeDropdown />
        {/* <UserDropdown /> */}
      </div>
    </div>
    </LayoutNavbar>
  )
  
}

export default Navbar

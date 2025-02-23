"use client"
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';


import { useDispatch, useSelector } from 'react-redux'

import { getUserLoggedIn } from '@/redux/features/user/action'

const withAuth = (WrappedComponent: any, allowedRoles: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const Wrapper = (props: any) => {
    const { data } = useSelector((state: any) => state.user)
    const dispatch: any = useDispatch()

    const router = useRouter()

    useEffect(() => {
      if (data?.data?.Role.name !== allowedRoles) {
        router.push('/not-found')
      }
    }, [data?.data?.status, data?.data?.Role.name])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth;

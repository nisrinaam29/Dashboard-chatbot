import React,{useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '@/redux/features/messages/action'
function ProfileFirebase({slug}) {
  const { data, error, loading } = useSelector(state => state.messages)
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(getMessages(slug))
  }, [])

  return (
    <div className='grid grid-rows-5 '>
      <div className='row-span-2 flex flex-col  items-center justify-center'>
        {/* <UserCircleIcon className="w-[180px]" /> */}
        <h1 className='text-2xl'>{data?.data?.phoneNumber}</h1>
      </div>
      <div className='row-span-1  border-t'>
        <div className='p-5'>
          <p className='pb-3 space-y-3 text-neutral-400 '>INFORMATION</p>
          <p className='flex gap-2 flex-row items-center pb-4'>
            {/* <UserIcon className="w-9 fill-white rounded-full p-2 bg-black" /> */}
            customer job
          </p>
          <p className='flex gap-2 flex-row items-center'>
            {/* <EnvelopeIcon className="w-9 fill-white stroke-white-2 bg-black rounded-full p-2" /> */}
            customer email
          </p>
        </div>
      </div>
      <div className='row-span-2 gap-4 border-t'>
        <div className='p-5'>
          <p className='pb-3 text-neutral-400 '>TASK DETAILS</p>

          <div className='flex flex-row text-neutral-400 pb-4'>
            <p>Status</p>
            <p className='pl-5 text-sky-500'>
              : <span className=''>{data?.data?.status}</span>
            </p>
          </div>
          <div className='flex flex-row text-neutral-400 pb-4'>
            <p>Category</p><p className='pl-5 text-black'>: CATEGORY</p>
          </div>
          <div className='flex flex-row text-neutral-400 pb-4'>
            <p>Request Submitted</p><p className='pl-5 text-black'>{data?.data?.reqSub}</p>
          </div>

          {/* Additional content */}
        </div>
      </div>
    </div>
  )
}

export default ProfileSender

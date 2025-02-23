'use client'

import { useEffect, useState } from 'react'
import styles from '@core/styles/table.module.css'
import { Button, Card, CircularProgress, Pagination } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TableWithSearch from '@/components/layout/table/TableWithSearch'
import { clearCategory, deleteCategory, getAllCategories, setSelectedID } from '@/redux/features/categories/action'
import DeleteModal from '@/components/DeleteModal'
import UpdateModal from '@/components/UpdateModal'
import UpdateCategory from '@/components/updateForm/UpdateCategory'
import { setCloseModal, setCloseModalUpdate, setOpenModalUpdate } from '@/redux/features/modal/action'
import { toast, ToastContainer } from 'react-toastify'
import UpdateQuestion from '@/components/updateForm/UpdateQuestion'
import { create } from 'domain'

function Page() {
  const { data, error, createData, createError, updateData, updateError, deleteData, deleteError } =
    useSelector((state: any) => state.categories)
  const { search } = useSelector((state: any) => state.general)
  const [valuePage, setValuePage] = useState(1)
  const dispatch: any = useDispatch()
  const [tableLoading, setTableLoading] = useState(false)
  useEffect(() => {
    dispatch(getAllCategories(valuePage, search))
  }, [valuePage, search, updateData?.success, createData?.success, deleteData?.success])

  useEffect(() => {
    if (updateData?.success) {
      dispatch(setCloseModalUpdate())
      toast.success(updateData?.message)
      // return dispatch(clearCategory())
    } else if (updateError) {
      toast.error(updateError?.message)
    }
    if (createData?.success) {
      dispatch(setCloseModal())
      toast.success(createData?.message)
      // return dispatch(clearCategory())
    } else if (createError) {
      toast.error(createError?.message)
      // return dispatch(clearCategory())
    }
    if (deleteData?.success) {
      toast.success(deleteData?.message)
      console.log(data?.data?.categories?.length)
      if (data?.data?.categories?.length === 0) {
        // Decrement the page if there's no data on the current page
        if (valuePage > 1) {
            setValuePage(valuePage - 1);
        }
    }
    }
  }, [updateData?.success,createError?.message, createData?.success,updateError?.message, deleteData?.success,data?.data?.categories])

  const handleClick = (id: any) => {
    dispatch(setSelectedID(id))
    dispatch(setOpenModalUpdate())
  }
  const handleChangePagination = (event: any, value: any) => {
    setValuePage(value)
  }
  useEffect(() => {
    return dispatch(clearCategory())
  }, [
    createData?.success,
    createError?.message,
    updateData?.success,
    updateData?.message,
    updateError?.message,
    deleteData?.success,
    deleteError?.message,
    deleteData?.message
  ])
  useEffect(() => {
    setValuePage(1)
  }, [search])
  return (
    <div className='flex flex-col gap-8 justify-end items-end'>
      <Card className='w-full'>
        <TableWithSearch type='CATEGORY'>
          <ToastContainer />
          {tableLoading  ? (
            <div className='flex justify-center items-center'>
              <CircularProgress />
            </div>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td className='text-center py-4'>No</td>
                    <td className='text-center py-4'>Text</td>
                    <td className='text-center py-4'>Nama</td>
                    <td className='text-center py-4'>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {tableLoading  && (
                    <div className='flex w-full h-full justify-center'>
                      <CircularProgress />
                    </div>
                  )}
                  {data?.data?.categories?.length > 0 ? (
                    data?.data?.categories?.map((item, index) => (
                      <tr key={item?.id}>
                        <td className='text-xs text-center'>{data?.data?.offset + index + 1}</td>
                        <td className='text-xs text-center'>{item?.text}</td>
                        <td className='text-xs text-center'>{item?.name}</td>
                        <td className='text-xs flex gap-4 justify-center'>
                          <DeleteModal handleDelete={() => dispatch(deleteCategory(item?.id))} />
                          <Button onClick={() => handleClick(item?.id)} variant='outlined'>
                            <i className='tabler-edit' />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className='text-center'>
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
          <div className='flex  justify-center p-8'>
            <Pagination
              count={data?.data?.totalPage || 0}
              variant='tonal'
              shape='rounded'
              color='primary'
              onChange={handleChangePagination}
              page={valuePage}
            />
          </div>
        </TableWithSearch>
        <UpdateModal>
          <UpdateCategory />
          {/* <UpdateQuestion /> */}
        </UpdateModal>
      </Card>
    </div>
  )
}
export default Page

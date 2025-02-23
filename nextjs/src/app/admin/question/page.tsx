'use client'

import { useEffect, useState } from 'react'

import styles from '@core/styles/table.module.css'
import { Button, Card, CircularProgress, Pagination } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import TableWithSearch from '@/components/layout/table/TableWithSearch'
import { setCloseModalUpdate, setOpenModal, setOpenModalUpdate } from '@/redux/features/modal/action'
import DeleteModal from '@/components/DeleteModal'
import UpdateModal from '@/components/UpdateModal'
import UpdateQuestion from '@/components/updateForm/UpdateQuestion'
import { clearQuestion, deleteQuestion, getAllQuestions } from '@/redux/features/questions/action'
import { getAllCategories, setSelectedID } from '@/redux/features/categories/action'
import { toast, ToastContainer } from 'react-toastify'

function Page() {
  const { data, error, deleteError, deleteData, updateData, createData, createError, updateError } =
    useSelector((state: any) => state.questions)
  const { search } = useSelector((state: any) => state.general)
  const [valuePage, setValuePage] = useState(1)
  const dispatch: any = useDispatch()
  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllQuestions(valuePage, search))
  }, [
    deleteData?.success,
    deleteData?.message,
    updateData?.success,
    createData?.success,
    deleteData?.message,
    valuePage,
    search
  ])


  useEffect(() => {
    if (updateData?.success) {
      dispatch(setCloseModalUpdate())
      toast.success(updateData?.message)
    } else if (updateError) {
      toast.error(updateError?.message)
    }

    if (createData?.success) {
      toast.success(createData?.message)
    } else if (createError) {
      toast.error(createError?.message)
    }
    if (deleteData?.success) {
      toast.success(deleteData?.message)
    } else if (deleteError) {
      toast.error(deleteError?.message)
    }
    // return dispatch(clearQuestion())
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

  const handleClick = (id: any) => {
    dispatch(setSelectedID(id))
    dispatch(setOpenModalUpdate())
  }
  useEffect(()=>{
        return dispatch(clearQuestion())

  }, [ createData?.success,
    createError?.message,
    updateData?.success,
    updateData?.message,
    updateError?.message,
    deleteData?.success,
    deleteError?.message,
    deleteData?.message])
  const handleChangePagination = (event: any, value: any) => {
    setValuePage(value)
  }
  useEffect(() => {
    setValuePage(1)
  }, [search])
  return (
    <div className='flex flex-col gap-8 justify-end items-end'>
      <Card className='w-full'>
        <TableWithSearch type={'QUESTION'}>
          <ToastContainer />
          {tableLoading ? (
            <div className='flex justify-center items-center'>
              <CircularProgress />
            </div>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td className='text-center py-4'>No</td>
                    <td className='text-center py-4'>Kategori</td>
                    <td className='text-center py-4'>Pertanyaan</td>
                    {/* <td className='text-center py-4'>Answer</td> */}
                    <td className='text-center py-4'>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.questions?.length > 0 ? (
                    data?.data?.questions?.map((item: any, index: any) => (
                      <tr key={index}>
                        <td className='text-xs'>{data?.data?.offset + index + 1}</td>
                        <td className='text-xs'>{item?.category.name}</td>
                        <td className='text-xs'>{item?.text}</td>
                        {/* <td className='text-xs'>{item?.answer}</td> */}
                        <td className='text-xs flex gap-4 justify-center'>
                          <DeleteModal handleDelete={() => dispatch(deleteQuestion(item?.id))} />
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
              count={data?.data?.totalPage}
              variant='tonal'
              shape='rounded'
              color='primary'
              onChange={handleChangePagination}
              page={valuePage}
            />
          </div>
        </TableWithSearch>
        <UpdateModal>
          <UpdateQuestion />
        </UpdateModal>
      </Card>
    </div>
  )
}

export default Page

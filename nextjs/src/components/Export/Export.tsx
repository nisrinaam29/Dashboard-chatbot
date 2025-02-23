import { useEffect } from 'react'

import { Button, MenuItem } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'

const Export = () => {
  const { selectedIds, data, loading } = useSelector((state: any) => state.generate)
  const dispatch: any = useDispatch()

  const handleSubmitExport = (e:any) => {
    e.preventDefault()
    dispatch(postGenerate({ selectedIds: selectedIds }))
  }


  useEffect(() => {
    if (data?.success) {
      data?.data?.images.forEach((element:any) => {
        const pdfUrl = element
        const link = document.createElement('a')

        link.href = pdfUrl
        link.download = 'sample.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }

    return dispatch(clearGenerate())
  }, [data?.data?.images])

  return (
    <form className='flex items-end gap-2' onSubmit={handleSubmitExport}>
      <CustomTextField
        select
        fullWidth
        defaultValue='pdf'
        label='Export as'
        id='custom-select-small'
        className='w-28'
        name='format'
      >
        <MenuItem value='pdf' selected>
          PDF
        </MenuItem>
        <MenuItem value='excel'>EXCEL</MenuItem>
      </CustomTextField>
      <Button variant='tonal' type='submit' disabled={loading}>
        {loading ? 'Loading' : 'Export'}
      </Button>
    </form>
  )
}

export default Export

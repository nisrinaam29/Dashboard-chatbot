import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { decryptor } from '@/utils/cryptograph'

const useRouteCategory = () => {
  const [parentID, setParentID] = useState<number>(0)
  const [categoryID, setCategoryID] = useState<number>(0)
  const pathname = usePathname()
  const paths = pathname.split('/')
  const categoryPath = paths[paths.length - 1]
  const pathDecripted = decryptor(categoryPath)

  useEffect(() => {
    if (pathDecripted.split('~').length > 1) {
      setParentID(Number(pathDecripted.split('~')[0]))
      setCategoryID(Number(pathDecripted.split('~')[1]))
    } else {
      setParentID(Number(decryptor(categoryPath)))
      setCategoryID(Number(decryptor(categoryPath)))
    }
  }, [])

  return { parentID, categoryID, pathDecripted, categoryPath }
}

export default useRouteCategory

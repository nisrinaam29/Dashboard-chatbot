'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@/@menu/hooks/useVerticalNav'
import useHorizontalNav from '@/@menu/hooks/useHorizontalNav'
import { useSettings } from '@/@core/hooks/useSettings'

// Util Imports
import { verticalLayoutClasses } from '@/@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { settings } = useSettings()
  const { isBreakpointReached: isVerticalBreakpointReached } = useVerticalNav()
  const { isBreakpointReached: isHorizontalBreakpointReached } = useHorizontalNav()

  // Vars
  const isBreakpointReached =
    settings.layout === 'vertical' ? isVerticalBreakpointReached : isHorizontalBreakpointReached

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center pt-2 justify-between flex-wrap gap-4')}
    >
      <p>
      Copyright © 2024 Nisrina Marwah | All rights reserved
      </p>
    </div>
  )
}

export default FooterContent

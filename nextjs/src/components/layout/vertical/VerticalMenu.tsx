'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@/@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@/@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings'
import useVerticalNav from '@/@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@/@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@/@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@/@core/styles/vertical/menuSectionStyles'
import { encryptor } from '@/utils/cryptograph'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/admin/ongoing-ticket' icon={<i className='tabler-layout-dashboard' />}>
          On-Going Ticket
        </MenuItem>
        <MenuItem href='/admin/request-ticket' icon={<i className='tabler-clipboard-list' />}>
          Request Ticket
        </MenuItem>
        <MenuItem href='/admin/history-ticket' icon={<i className='tabler-history' />}>
          History Ticket
        </MenuItem>
        <MenuItem href='/admin/question' icon={<i className='tabler-brand-hipchat' />}>
          Pertanyaan
        </MenuItem>
        <MenuItem href='/admin/category' icon={<i className='tabler-category' />}>
          Kategori
        </MenuItem>
        <MenuItem href='/admin/settings' icon={<i className='tabler-settings' />}>
          Settings
        </MenuItem>
        
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu

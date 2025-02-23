// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@/@core/types'
import 'react-toastify/dist/ReactToastify.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import ProvidersRedux from '@/redux/providers'

export const metadata = {
  title: 'Chatbot Recruitment'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <ProvidersRedux>
      <html id='__next' lang='en' dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>
          <>
            {children}
          </>
        </body>
      </html>
    </ProvidersRedux>
  )
}

export default RootLayout

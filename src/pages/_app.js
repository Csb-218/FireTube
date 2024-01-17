
import '@/styles/globals.css'
import { useEffect, useState, createContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Constants from '../utils/Constants'
import AccessContext from '@/context/AccessContext'
import AuthProvider from '@/context/AuthContext'
import Navbar2 from '@/components/Navbar2'
const FeedContext = createContext();



export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  }, [])


  const [searchTerm, setTerm] = useState();
  const { sidebar_items, feedState } = Constants()
  const [select, setSelect] = useState()
  const [queryClient] = useState(() => new QueryClient())


  const _cookies = null
  
  return (
    <>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AccessContext.Provider value={{_cookies}}>
            <FeedContext.Provider value={{ searchTerm, setTerm, select, setSelect, sidebar_items }}>
              {/* <Navbar /> */}
              <Navbar2 />
              <Component {...pageProps} />
            </FeedContext.Provider>
          </AccessContext.Provider>
          </AuthProvider>
        </QueryClientProvider>
    </>
  )

}
export { FeedContext }



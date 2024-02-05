'use client;'
import '@/styles/globals.css'
import { useEffect, useState ,createContext} from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Constants from '../utils/Constants'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from '@/components/Navbar'
const FeedContext = createContext();
import { useUser } from '@auth0/nextjs-auth0/client'
import Navbar2 from '@/components/Navbar2'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  }, [])
  
  const [searchTerm,setTerm] = useState();
  const {sidebar_items,feedState} = Constants()
  const [select, setSelect] = useState()
  const [queryClient] = useState(() => new QueryClient())
  

  return (
    <>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <FeedContext.Provider value={{searchTerm,setTerm,select,setSelect,sidebar_items}}>
          {/* <Navbar /> */}
          <Navbar2/>
          <Component {...pageProps} />
        </FeedContext.Provider>
      </QueryClientProvider>
    </UserProvider>
    </>
  )
}
export {FeedContext}
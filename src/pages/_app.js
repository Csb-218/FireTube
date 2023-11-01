'use client;'
import '@/styles/globals.css'
import { useEffect, useState ,createContext} from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Constants from '../utils/Constants'
import { UserProvider } from '@auth0/nextjs-auth0/client';

const FeedContext = createContext();

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  }, [])
  
  
  const {sidebar_items,feedState} = Constants()
  const [feed_state,setFeed] = useState(feedState?.[0])
  const [select, setSelect] = useState()
  const [search_term,setSearch_term] = useState()
  const [queryClient] = useState(() => new QueryClient())

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <FeedContext.Provider value={{select,setSelect,sidebar_items,search_term,setSearch_term , feed_state , setFeed}}>
        <Component {...pageProps} />
      </FeedContext.Provider>
    </QueryClientProvider>
    </UserProvider>
    
  )

}
export {FeedContext}
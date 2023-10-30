import '@/styles/globals.css'
import { useEffect, useState ,createContext} from 'react'
'use client;'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Constants from '../utils/Constants'


const FeedContext = createContext();

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  }, [])

  const sidebar_items = Constants()
  const [select, setSelect] = useState()
  const [search_term,setSearch_term] = useState()
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <FeedContext.Provider value={{select,setSelect,sidebar_items,search_term,setSearch_term}}>
        <Component {...pageProps} />
      </FeedContext.Provider>
    </QueryClientProvider>
  )

}
export {FeedContext}
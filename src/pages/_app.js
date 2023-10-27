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
  const [select, setSelect] = useState(sidebar_items[0].id)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <FeedContext.Provider value={{select,setSelect,sidebar_items}}>
        <Component {...pageProps} />
      </FeedContext.Provider>
    </QueryClientProvider>
  )

}
export {FeedContext}
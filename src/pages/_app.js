import '@/styles/globals.css'
import { useEffect, useState } from 'react'
'use client;'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  }, [])

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

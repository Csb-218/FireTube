'use client'
import '@/styles/globals.css'
import Cookies from 'universal-cookie';
import { useEffect, useState ,createContext} from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Constants from '../utils/Constants'
import { UserProvider, } from '@auth0/nextjs-auth0/client';
import AccessContext from '@/context/AccessContext'
import Navbar from '@/components/Navbar'
const FeedContext = createContext();
import Navbar2 from '@/components/Navbar2'

const _cookies = new Cookies();

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import('preline')
  }, [])
  
  const [searchTerm,setTerm] = useState();
  const {sidebar_items,feedState} = Constants()
  const [select, setSelect] = useState()
  const [queryClient] = useState(() => new QueryClient())
  // const router = useRouter()
  // const {access_token,expires_in} = router.query

  useEffect(()=>{

    // Get the current URL
    const currentUrl = window.location.href;

    // Extract the fragment (everything after the '#')
    const fragment = currentUrl.split('#')[1];

    // Use the URL constructor to parse the fragment
    const urlParams = new URLSearchParams(fragment);

    // Extract the access_token and expires_in values
    const accessToken = urlParams.get('access_token');
    const expiresIn = urlParams.get('expires_in');
    
    _cookies.set("access_token",accessToken , { path: '/', maxAge:expiresIn})

    // console.log(accessToken, expiresIn)
    
  },[])



  return (
    <>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AccessContext.Provider value={{_cookies}}>
           <FeedContext.Provider value={{searchTerm,setTerm,select,setSelect,sidebar_items}}>
          {/* <Navbar /> */}
          <Navbar2/>
          <Component {...pageProps} />
        </FeedContext.Provider>
        </AccessContext.Provider>
       
      </QueryClientProvider>
    </UserProvider>
    </>
    
    
  )

}
export {FeedContext}
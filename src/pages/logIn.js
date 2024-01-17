import {useEffect} from 'react'
import { useRouter } from 'next/router'

const logIn = () => {

  const router = useRouter()
  const userState = 'loggedIn'
  
  useEffect(()=>{
    // router.reload()
    router.replace({
      pathname: '/',
      query: {userState:userState},
    })
    // router.reload()
  },[])

  return (
    <>
    </>
  )
}

export default logIn
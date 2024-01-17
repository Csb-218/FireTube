import {useEffect} from 'react'
import { useRouter } from 'next/router'

const logOut = () => {

  const router = useRouter()
  const userState = 'loggedOut'
  
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

export default logOut
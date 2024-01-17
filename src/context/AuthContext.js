import { createContext, useEffect, useState, useContext } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
const AuthContext = createContext();



const AuthProvider = ({ children }) => {

  const router = useRouter()
  const { userState } = router.query
  const [user, setUser] = useState(null)
  const cookies = new Cookies

  useEffect(() => {
    const name = cookies.get('username')
    const picture = cookies.get('picture')
    const access_token = cookies.get('access_token')

    if (name && picture && access_token) {
      const user = {
        name: name,
        picture: picture,
        access_token:access_token
      }
      setUser(user)
    }

    else{
      userState && setUser(null)
    }

  }, [userState])


  return <AuthContext.Provider value={{ user }} >{children}</AuthContext.Provider>
}
export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext);
};


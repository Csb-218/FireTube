import { NextResponse, NextRequest } from 'next/server'
import { useRouter } from 'next/router';
import { getAuthCode } from './services/Api'
import { jwtDecode } from 'jwt-decode'
import { generateRandomString } from './utils/Helper'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  // const router = useRouter();
  // let user = request?.cookies.get('username') 
  const code = request?.nextUrl?.searchParams.get('code')
  const { pathname } = request.nextUrl

  let nextResponse = NextResponse.next()

  // on home page
  if (pathname === '/' ) {

    if (code) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE}/api/authGoogle?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const { data } = await response.json()

      console.log(data, 999)

      if (response?.status === 200) {
        const { id_token, access_token } = data;
        const decoded = jwtDecode(id_token);

        const { email, name, picture, exp } = decoded
        console.log(decoded,777)

        nextResponse.cookies.set("username", name)
        nextResponse.cookies.set("email", email)
        nextResponse.cookies.set("picture", picture)
        nextResponse.cookies.set("access_token", access_token)
      }
      return nextResponse
    }
    else{
      return nextResponse
    }

  }
  // on login page
  if (pathname === '/logIn'){

     nextResponse.cookies.delete('username')
     nextResponse.cookies.delete('picture')
     nextResponse.cookies.delete('email')
     nextResponse.cookies.delete('access_token')
     console.log(48)

     const state = generateRandomString(30)
     const nonce = generateRandomString(10)

     const response_type = `code`

     const url = `${process.env.NEXT_PUBLIC_AUTH_BASE}?client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT}&response_type=${response_type}&scope=${process.env.NEXT_PUBLIC_SCOPE}&state=${state}&nonce=${nonce}&hd=${process.env.NEXT_PUBLLIC_HD}`
     return NextResponse.redirect(url)
  }
  // on log out page
  if (pathname === '/logOut'){
    
    console.log('logOut')
    nextResponse.cookies.delete('username')
    nextResponse.cookies.delete('picture')
    nextResponse.cookies.delete('email')
    nextResponse.cookies.delete('access_token')

    return nextResponse

 }

//  on any other page
  else {
    const username = request?.cookies.get('username')
    const email = request?.cookies.get('email')
    const picture = request?.cookies.get('picture')

    if (username && email && picture) {

      return nextResponse
    }
    else {
      console.log('bye')
      const state = generateRandomString(30)
      const nonce = generateRandomString(10)
      
      const response_type = `code`
     
      const url = `${process.env.NEXT_PUBLIC_AUTH_BASE}?client_id=${process.env.NEXT_PUBLIC_AUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_AUTH_REDIRECT}&response_type=${response_type}&scope=${process.env.NEXT_PUBLIC_SCOPE}&state=${state}&nonce=${nonce}&hd=${process.env.NEXT_PUBLIC_HD}`

      return NextResponse.redirect(url)
    }
  }




}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/video/:id*','/channel/:channelId*','/category/:category*','/search/:search_query*'
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}
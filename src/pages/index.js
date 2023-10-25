
import { Inter } from 'next/font/google'
import Feed from '../components/Feed/Feed'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (
      <>
      <Feed/>
      </>
  )
}

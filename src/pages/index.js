
import { Inter } from 'next/font/google'
import Feed from '../components/Feed/Feed'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  

  return (
      <>
       <Feed/>
      </>
  )
}

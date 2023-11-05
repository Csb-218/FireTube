import {createContext,useState,useContext} from 'react'
import Navbar from '../Navbar'
import FeedContent from './FeedContent'
import Constants from '../../utils/Constants'

function Feed() {
  
  // const sidebar_items = Constants()
  // const [select, setSelect] = useState(sidebar_items[0].id)

  return (
    <>
       <Navbar />
       <FeedContent />
    </>
  )
}

export default Feed

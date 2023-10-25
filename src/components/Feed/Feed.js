import {createContext,useState} from 'react'
import Navbar from '../Navbar'
import FeedContent from './FeedContent'
import Constants from '../../utils/Constants'

const FeedContext = createContext();

function Feed() {
  
  const sidebar_items = Constants()
  const [select, setSelect] = useState(sidebar_items[0].id)

  return (
    <FeedContext.Provider value={{select,setSelect,sidebar_items}}>
       <Navbar />
       <FeedContent />
    </FeedContext.Provider>
   
  )
}

export default Feed
export {FeedContext}
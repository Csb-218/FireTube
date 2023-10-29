import { useContext ,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../cards/VideoCard'
import {videosByCategory} from "../../API/Api"
import CardSkeleton from '../skeletons/CardSkeleton'



const FeedContent = () => {

  const { select, setSelect, sidebar_items } = useContext(FeedContext)
  
  const { isLoading,isPending, isError, data, error } = useQuery({ 
    queryKey: ['videos',select], 
    queryFn:()=>videosByCategory(select) ,
    enabled: !!select
  })

  return (
    <>
    {console.log(isLoading,isPending, isError,data)}
      <p>
        {select}
      </p>
      <div className="w-screen bg-lime-400 px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto ">
        <div className="w-screen bg-amber-400 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            isLoading?   
            sidebar_items.map(item =>
             <>
             <CardSkeleton key={item.id}/>
             <CardSkeleton key={item.id}/>
             </>)
            // <p>Loading</p>
            :
            data && data.map(item => {
              // console.log(item)
              return (
                <VideoCard 
                  key={item.id}
                  videoId={item.id}
                  videoData={item}
                  thumbnail={item.snippet.thumbnails.high.url}
                  title={item.snippet.title}
                  description={item.snippet.description}
                  channelTitle={item.snippet.channelTitle
                  }
                />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default FeedContent
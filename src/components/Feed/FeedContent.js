import { useContext ,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { FeedContext } from './Feed'
import VideoCard from '../cards/VideoCard'
import {videosByCategory} from "../../API/Api"



const FeedContent = () => {

  const { select, setSelect, sidebar_items } = useContext(FeedContext)
  
  const { isLoading,isPending, isError, data, error } = useQuery({ 
    queryKey: ['videos',select], 
    queryFn:()=>videosByCategory(select) ,
    enabled: !!select
  })
 

  // const getVideos = async() =>{
  //   videosByCategory(20)
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err))
  // }

  // useEffect(()=>{
  //   getVideos()
  //   console.log(process.env.NEXT_PUBLIC_API_KEY)
  // },[])

  return (
    <>
    {console.log(isLoading,isPending, isError,data)}
      <div>FeedContent</div>
      <p>
        {select}
      </p>
      <div class="max-w-[94rem] px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto ">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            isLoading?   
            <p>Loading ...</p>
            :
            data && data.map(item => {
              // console.log(item)
              return (
                <VideoCard key={sidebar_items.indexOf(item)}
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
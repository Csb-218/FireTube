import { useContext ,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../cards/VideoCard'
import {videosByCategory,searchVideos} from "../../API/Api"
import CardSkeleton from '../skeletons/CardSkeleton'



const FeedContent = () => {

  const { select, setSelect, sidebar_items,search_term ,setSearch_term } = useContext(FeedContext)
  
  const { isLoading:catLoading, isPending:catPending, isError:catIsError, data:catData, error:catError } = useQuery({ 
    queryKey: ['videos',select], 
    queryFn:()=>videosByCategory(select) ,
    enabled: !!select
  })
  const { isLoading:sLoading , isPending:sPending, isError:sIsError, data:sData, error:sError} = useQuery({ 
    queryKey: ['searchedVideos',search_term], 
    queryFn:()=>searchVideos(search_term) ,
    enabled: !!search_term
  })

  return (
    <>
    {/* {console.log(isLoading,isPending, isError,data)} */}

      <div className=" w-[500px] lg:w-full  px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto ">
        <div className="w-full  grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            catLoading?   
            sidebar_items.map(item =>
             <span key={item.id}>
             <CardSkeleton />
             <CardSkeleton />
             </span>)
            // <p>Loading</p>
            :
            catData && catData.map(item => {
              // console.log(item)
              return (
                <VideoCard 
                  key={item.id}
                  videoId={item.id.videoId}
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
          {
                        sLoading?   
                        sidebar_items.map(item =>
                         <span key={item.id}>
                         <CardSkeleton />
                         <CardSkeleton />
                         </span>)
                        // <p>Loading</p>
                        :
                        sData && sData.map(item => {
                           console.log(item)
                          return (
                            <VideoCard 
                              key={item.id.videoId}
                              videoId={item.id.videoId}
                              videoData={item}
                              thumbnail={item.snippet.thumbnails.high.url}
                              title={item.snippet.title}
                              description={item.snippet.description}
                              channelTitle={item.snippet.channelTitle}
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
import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../cards/VideoCard'
import { videosByCategory, searchVideos, FeedVideos } from "../../API/Api"
import CardSkeleton from '../skeletons/CardSkeleton'
import ChannelCard from '../cards/ChannelCard'





const FeedContent = () => {

  const [lazyLoad,setLazy] = useState(0)

   const handleScroll = async() =>{
     try {
      // console.log('scrollHeight',document.documentElement.scrollHeight)
      // console.log('innerHeight',window.innerHeight)
      // console.log('scrollTop',document.documentElement.scrollTop)
      // console.log(window.scrollY)

      const scrollHeight = document.documentElement.scrollHeight
      const scrolledBy = window.scrollY
      const innerHeight = window.innerHeight
      if((scrolledBy + innerHeight + 5) >= scrollHeight ){
        console.log('fetch')
        window.scrollBy(0,-50)
        setLazy(a => a+1)
        
      }
      
     } catch (error) {
      console.log(error)
     }
   }

   useEffect(() => {
     window.addEventListener('scroll',handleScroll)
   }, [])
   
  
  
   
  
  const { select, setSelect, sidebar_items, search_term, setSearch_term ,feed_state , setFeed} = useContext(FeedContext)

  const { isLoading: catLoading, isPending: catPending, isError: catIsError, data: catData, error: catError } = useQuery({
    queryKey: ['videos', select],
    queryFn: () => videosByCategory(select),
    enabled: feed_state==='category',
    refetchIntervalInBackground:false,
    refetchOnMount:false,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false

  })
  const { isLoading: sLoading, isPending: sPending, isError: sIsError, data: sData, error: sError } = useQuery({
    queryKey: ['searchedVideos', search_term],
    queryFn: () => searchVideos(search_term),
    enabled: feed_state==='search' ,
    refetchIntervalInBackground:false,
    refetchOnMount:false,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false

  })
  const { isLoading: feedLoading, isPending: feedPending, isError: feedIsError, data: feedData, error: feedError } = useQuery({
    queryKey: ['feedvideos',lazyLoad],
    queryFn: () => FeedVideos(pToken),
    enabled: feed_state==='homefeed',
    keepPreviousData:true,
    refetchIntervalInBackground:false,
    refetchOnMount:false,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false

  })

  const pToken = feedData?.nextPageToken

  return (
    <>
      {/* {console.log(isLoading,isPending, isError,data)} */}
      { console.log(lazyLoad,feedData,pToken)}
      <div className=" w-[500px] lg:w-full  px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto  " >
        <div className="w-full  grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            catLoading ?
              sidebar_items.map(item =>
                <span key={item.id}>
                  <CardSkeleton />
                  <CardSkeleton />
                </span>
              )
              :
              catData && catData.map(item => {
                // console.log(item)
                return (
                  <VideoCard
                    key={item.id}
                    videoId={item.id}
                    videoData={item}
                    thumbnail={item.snippet.thumbnails.high.url}
                    title={item.snippet.title}
                    description={item.snippet.description}
                    channelTitle={item.snippet.channelTitle}
                  />
                )
              })
          }
          {
            sLoading ?
              sidebar_items.map(item =>
                <span key={item.id+1}>
                  <CardSkeleton />
                  <CardSkeleton />
                </span>)
              :
              sData && sData.map(item => {
                 
                if(item?.id?.kind === 'youtube#video'){
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
                )}
                if(item?.id?.kind === "youtube#channel"){
                  return (
                  <ChannelCard
                   key={item?.id?.channelId}
                   channelId={item?.id?.channelId}
                   thumbnail={item?.snippet?.thumbnails?.high?.url}
                   title={item?.snippet?.title}
                   description={item?.snippet?.description}
                  
                  />
                )}

                
              })
          }
          {
            feedLoading ?
              sidebar_items.map(item =>
                <span key={item.id+2}>
                  <CardSkeleton />
                  <CardSkeleton />
                </span>)
              :
              feedData?.items?.map(item => {
                // console.log(item)
                return (
                  <VideoCard
                    key={item.id}
                    videoId={item.id}
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
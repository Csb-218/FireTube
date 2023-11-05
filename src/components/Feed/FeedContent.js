import { useContext, useEffect, useState } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../cards/VideoCard'
import { videosByCategory, searchVideos, FeedVideos } from "../../API/Api"
import CardSkeleton from '../skeletons/CardSkeleton'
import ChannelCard from '../cards/ChannelCard'



const FeedContent = () => {

  const { sidebar_items } = useContext(FeedContext)

  const handleScroll = async () => {
    try {
      const scrollHeight = document.documentElement.scrollHeight
      const scrolledBy = window.scrollY
      const innerHeight = window.innerHeight
      if ((scrolledBy + innerHeight + 5) >= scrollHeight) {
       fetchFeed()
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])



  const { 
    data: feedData,
    error: feedError,
    fetchNextPage: fetchFeed,
    hasNextPage: hasNextFeed,
    isFetching: isFeedFetching,
    isLoading:isFeedLoading,
    isFetchingNextPage: isFetchingNextFeed,
    status: feedStatus
  } = useInfiniteQuery({
    queryKey: ['feedVideos'],
    queryFn: ({ pageParam = undefined }) => FeedVideos(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage?.nextPageToken ? lastPage.nextPageToken : undefined,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false

  })


  

  return (
    <>
    
      <div className=" w-[500px] lg:w-full  px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto  " >
        <div className="w-full  grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
              isFeedLoading ?
                sidebar_items.map(item =>
                  <span key={item.id + 2}>
                    <CardSkeleton />
                    <CardSkeleton />
                  </span>)
                :
                  feedData?.pages?.map(page => {
                    return (
                      page?.items?.map(item =>
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
                    )
                  })
          }
      
          {
            isFeedFetching  ?
             sidebar_items.map(item =>
               <span key={item.id + 2}>
                 <CardSkeleton />
                 <CardSkeleton />
               </span>)
               :
                !hasNextFeed? 
               'No more videos'
               :
               
               'Error Loading videos !'
          }
        </div>
      </div>
    </>
  )
}

export default FeedContent
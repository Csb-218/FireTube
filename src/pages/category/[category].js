import { useContext, useEffect, useState } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../../components/cards/VideoCard'
import { videosByCategory, searchVideos, FeedVideos } from "../../API/Api"
import CardSkeleton from '../../components/skeletons/CardSkeleton'
import ChannelCard from '../../components/cards/ChannelCard'
import ErrorBlock from '@/components/Errors/ErrorBlock'



const category = () => {

    const {select,sidebar_items} = useContext(FeedContext)
    const router = useRouter()
    const {category} = router.query


    const handleScroll = async () => {
        try {
          const scrollHeight = document.documentElement.scrollHeight
          const scrolledBy = window.scrollY
          const innerHeight = window.innerHeight
          if ((scrolledBy + innerHeight + 5) >= scrollHeight) {
            fetchCat()
          }
    
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll)
      }, [])

    const { 
        isLoading: catLoading, 
        isPending: catPending, 
        isError: IsCatError, 
        data: catData, 
        error: catError ,
        fetchNextPage: fetchCat,
        hasNextPage: hasNextCat,
        isFetching: isCatFetching,
        isFetchingNextPage: isFetchingCat,
      } = useInfiniteQuery({
        queryKey: ['videos', select],
        queryFn: ({ pageParam = undefined }) => videosByCategory(select,pageParam),
        getNextPageParam: (lastPage, pages) => lastPage?.nextPageToken ? lastPage.nextPageToken : undefined,
        enabled: !!select,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false
    
      })

      
  return (
    <div className=" w-screen  px-4 py-0 sm:px-6 lg:px-2 lg:py-5 mx-auto   " >
        <div className="w-full  grid grid-cols-1 lg:grid-cols-4 gap-6">
          {console.log(catError,IsCatError,catData)}
        {
            catLoading ?
              sidebar_items.map(item =>
                <span key={item.id}>
                  <CardSkeleton />
                  <CardSkeleton />
                </span>
              )
              :
              catData?.pages?.map(page => {
                return(
                  page?.items?.map(item =>
                    <VideoCard
                    key={item.id}
                    videoId={item.id}
                    videoData={item}
                    thumbnail={item.snippet.thumbnails.high.url}
                    title={item.snippet.title}
                    description={item.snippet.description}
                    channelTitle={item.snippet.channelTitle}
                    channelId={item.snippet.channelId}
                  />
                    )
                )
              })
          }
          {
             isCatFetching  ?
             sidebar_items.map(item =>
               <span key={item.id + 2}>
                 <CardSkeleton />
                 <CardSkeleton />
               </span>)
              :
               IsCatError?
              <ErrorBlock/>
              :
               !hasNextCat? 
              'No more videos'
              :
              null
          }
      
        </div>
    </div>
  )
}

export default category
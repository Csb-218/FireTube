import { useContext, useEffect, useState } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../cards/VideoCard'
import { videosByCategory, searchVideos, FeedVideos } from "../../API/Api"
import CardSkeleton from '../skeletons/CardSkeleton'
import ChannelCard from '../cards/ChannelCard'





const FeedContent = () => {



  const handleScroll = async () => {
    try {
      const scrollHeight = document.documentElement.scrollHeight
      const scrolledBy = window.scrollY
      const innerHeight = window.innerHeight
      if ((scrolledBy + innerHeight + 5) >= scrollHeight) {
        console.log(feed_state)
        feed_state === 'homefeed' ?
        fetchFeed() 
        : 
        feed_state === 'search'?
        fetchSearch()
        :
        fetchCat()
        
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])



  const { select, setSelect, sidebar_items, search_term, setSearch_term, feed_state, setFeed } = useContext(FeedContext)

  const { 
    isLoading: catLoading, 
    isPending: catPending, 
    isError: catIsError, 
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
    enabled: feed_state === 'category',
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false

  })

  const {
    isLoading: isSearchLoading,
    isPending: isSearchPending,
    data: searchData,
    error: searchError,
    fetchNextPage: fetchSearch,
    hasNextPage: hasNextSearch,
    isFetching: isSearchFetching,
    isFetchingNextPage: isFetchingSearchPage,
  } = useInfiniteQuery({
    queryKey: ['searchedVideos', search_term],
    queryFn: ({ pageParam = undefined }) => searchVideos(search_term,pageParam),
    getNextPageParam: (lastPage, pages) => lastPage?.nextPageToken ? lastPage.nextPageToken : undefined,
    enabled: feed_state === 'search',
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false

  })


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
    enabled: feed_state === 'homefeed',
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false

  })


  return (
    <>
      {/* {console.log(`isFeedFetching:${isFeedFetching}`,`isFetchingNextFeed : ${isFetchingNextFeed}`,`isFeedLoading : ${isFeedLoading}`)} */}

      {console.log('isSearchFetching = ',isSearchFetching,'isFeedFetching=',isFeedFetching,'isCatFetching=',isCatFetching)}
      <div className=" w-[500px] lg:w-full  px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto  " >
        <div className="w-full  grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {
            feed_state === 'category'?
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
                  />
                    )
                )
                
              })
              :
              null
          }
          {
            feed_state === 'search' ?
              isSearchLoading ?
                sidebar_items.map(item =>
                  <span key={item.id + 1}>
                    <CardSkeleton />
                    <CardSkeleton />
                  </span>)
                :
                searchData?.pages?.map(page => {
                  return (
                    page?.items?.map(item => {
                      if (item?.id?.kind === 'youtube#video') {
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
                      }
                      if (item?.id?.kind === "youtube#channel") {
                        return (
                          <ChannelCard
                            key={item?.id?.channelId}
                            channelId={item?.id?.channelId}
                            thumbnail={item?.snippet?.thumbnails?.high?.url}
                            title={item?.snippet?.title}
                            description={item?.snippet?.description}

                          />
                        )
                      }
                    })
                  )
                })
            :
             null
          }

          {
            feed_state === 'homefeed' ?
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
                :
                null
          }
      
             
          
          {
            (isFeedFetching || isCatFetching) || isSearchFetching ?
             sidebar_items.map(item =>
               <span key={item.id + 2}>
                 <CardSkeleton />
                 <CardSkeleton />
               </span>)
               :

             'Error Loading videos !'
          }
        </div>
      </div>
    </>
  )
}

export default FeedContent
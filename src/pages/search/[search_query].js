import { useContext, useEffect, useState } from 'react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FeedContext } from '../../pages/_app'
import VideoCard from '../../components/cards/VideoCard'
import { videosByCategory, searchVideos, FeedVideos } from "../../services/Api"
import CardSkeleton from '../../components/skeletons/CardSkeleton'
import ChannelCard from '../../components/cards/ChannelCard'
import SearchVideoCard from '@/components/cards/SearchVideoCard'
import ErrorBlock from '@/components/Errors/ErrorBlock'

const search_query = () => {

    const { sidebar_items } = useContext(FeedContext)
    const router = useRouter()
    const { search_query } = router.query
    console.log(search_query)

    const handleScroll = async () => {
        try {
            const scrollHeight = document.documentElement.scrollHeight
            const scrolledBy = window.scrollY
            const innerHeight = window.innerHeight
            if ((scrolledBy + innerHeight + 5) >= scrollHeight) {
                fetchSearch()
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

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
        queryKey: ['searchedVideos', search_query],
        queryFn: ({ pageParam = undefined }) => searchVideos(search_query, pageParam),
        getNextPageParam: (lastPage, pages) => lastPage?.nextPageToken ? lastPage.nextPageToken : undefined,
        enabled: !!search_query,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false

    })


    return (
        <>
        <div className="w-screen  px-4 py-10 sm:px-6 lg:px-2 lg:py-14 mx-auto flex justify-center  " >
            <div className="lg:w-9/12  grid grid-cols-1 gap-y-2">
                
                {
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
                                            <SearchVideoCard
                                                key={item.id.videoId}
                                                videoId={item.id.videoId}
                                                videoData={item}
                                                thumbnail={item.snippet.thumbnails.high.url}
                                                title={item.snippet.title}
                                                description={item.snippet.description}
                                                channelTitle={item.snippet.channelTitle}
                                                channelId={item.snippet.channelId}
                                            />
                                        )
                                    }
                                    if (item?.id?.kind === "youtube#channel") {
                                        return (
                                        <div className='border-b-[0.5px] '>
                                            <ChannelCard
                                                key={item?.id?.channelId}
                                                channelId={item?.id?.channelId}
                                                thumbnail={item?.snippet?.thumbnails?.high?.url}
                                                title={item?.snippet?.title}
                                                description={item?.snippet?.description}
                                            />
                                        </div>
                                        )
                                    }
                                })
                            )
                        })

                }
                {
                    isSearchFetching ?
                        sidebar_items.map(item =>
                            <span key={item.id + 2}>
                                <CardSkeleton />
                                <CardSkeleton />
                            </span>)
                        :
                        searchError?
                        <ErrorBlock/>
                        :
                         !hasNextSearch? 
                        'No more videos'
                        :
                        null
                }
            </div>
        </div>
        </>
        
    )
}

export default search_query
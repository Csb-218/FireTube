import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { channelById } from '@/API/Api'
import stats from '../../utils/stats'

const SearchVideoCard = ({videoId,thumbnail, title, description, channelTitle,channelId}) => {

    const {data:channelData} = useQuery({
        queryKey:['channelId',channelId],
        queryFn:() => channelById(channelId),
        enabled: false
    })

    const {data:videoData} = useQuery({
        queryKey:['videoId',videoId],
        queryFn:() => channelById(videoId),
        enabled: !!videoId
    })

    const views = videoData?.statistics?.viewCount
    
    const channelProfile = channelData?.snippet?.thumbnails?.high?.url

    return (
        <>
        {console.log(videoData)}
        <Link href={`/video/${videoId}`}>
        <div className="w-full h-full  bg-transparent  shadow-sm flex flex-col sm:flex-row ">
                <div className="sm:w-full lg:w-1/3 rounded-xl sm:rounded-l-xl  h-auto">
                    <img className="object-scale-down w-full" src={thumbnail} alt="Image Description" />
                </div>
                <div className="flex flex-wrap  lg:w-2/3">
                    <div className="p-1 flex flex-col lg:space-y-1 space-x-1 h-full sm:p-7">
                        <h3 className="lg:text-lg font-bold text-gray-800 dark:text-white">
                            {title}
                        </h3>
                        <p className="mt-1 text-gray-800 dark:text-gray-400 overflow:truncate lg:block hidden">
                            {description}
                        </p>
                        {console.log(stats(views))}
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {views?stats(views):null}
                        </p>
                        
                    
                        <div className=" flex items-center gap-x-4 py-4">
                        {channelProfile && <img src={channelProfile}
                            className='lg:w-12 lg:h-12 w-[2rem] h-[2rem] rounded-full'
                            />}
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                {channelTitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
            
        </>
    )
}

export default SearchVideoCard
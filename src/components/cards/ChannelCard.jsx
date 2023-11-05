import React from 'react'
import Link from 'next/link'
import{useQuery} from '@tanstack/react-query'
import { channelById } from '@/API/Api'
import stats from '../../utils/stats'

const ChannelCard = ({title,thumbnail,description,channelId}) => {
    // console.log(thumbnail)
    const {data:channelData} = useQuery({
        queryKey:['channelId',channelId],
        queryFn:() => channelById(channelId),
        enabled: !!channelId
    })

    const views = channelData?.statistics?.viewCount
    const subscribers = channelData?.statistics?.subscriberCount
    const videos = channelData?.statistics?.videoCount

    return (
        <Link href={`/channel/${channelId}`}>
            
        <div className="bg-transparent my-8 rounded-xl shadow-sm sm:flex">
            <div className="flex justify-center h-full relative w-1/3">
                <img className="rounded-full w-1/2 " 
                src={thumbnail}
                alt="Image Description" />
            </div>
            <div className="flex flex-wrap">
                <div className="p-4 flex flex-col h-full sm:p-7">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        {description}
                    </p>
                    <div className="mt-5">
                        <div className='flex space-x-4'>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {stats(views)} views
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {stats(subscribers)} subscribers
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {stats(videos)} videos
                        </p>

                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            Last updated 5 mins ago
                        </p>
                    </div>
                </div>
            </div>
        </div>
         </Link>
        
    )
}

export default ChannelCard
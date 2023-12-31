import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { channelById } from '@/API/Api'
import Time from '../../utils/time'
const VideoCard = ({ videoData, videoId, thumbnail, title, description, channelTitle, channelId }) => {

 
    const { data: channelData } = useQuery({
        queryKey: ['channelId', channelId],
        queryFn: () => channelById(channelId),
        enabled: !!channelId
    })

    const channelProfile = channelData?.snippet?.thumbnails?.high?.url
    
    
    return (
        <>
            {/* {console.log(videoData?.contentDetails?.duration)} */}
            <Link href={`/video/${videoId}`}>
                <div className="group flex flex-col h-full  shadow-sm rounded-xl  ">
                    <div className="lg:h-52 h- flex flex-col justify-center items-center relative rounded-xl overflow-clip">
                        <img className="object-contain" src={thumbnail} />
                        <p className='absolute bottom-1 right-1 text-[10px] p-1 bg-black bg-opacity-80 rounded-md'>
                            {videoData?.contentDetails?.duration?.replace("H",":").replace("M",":").replace("S","").replace("PT","")}
                        </p>
                    </div>
                    <div className="p-1 h-1/5 ">

                        <h3 className="lg:text-xl text-sm font-semibold text-gray-800 dark:text-gray-300 truncate dark:hover:text-white ">
                            {title}
                        </h3>
                        <div className='flex space-x-2 justify-stretch items-center my-1'>
                            {channelProfile && <img src={channelProfile}
                                className='w-[2rem] h-[2rem] rounded-full'
                            />}
                            <p className="lg:mt-3 mt-1 text-gray-500 ">
                                {channelTitle}
                            </p>
                        </div>

                    </div>

                </div>
            </Link>

        </>


    )
}

export default VideoCard
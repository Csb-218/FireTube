import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const VideoCard = ({videoData,videoId,thumbnail,title,description,channelTitle}) => {

    return (
        <Link href={`/video/${videoId}`}>
        <div className="group flex flex-col h-full  shadow-sm rounded-xl  ">
            <div className="lg:h-52 h-full flex flex-col justify-center items-center  rounded-xl overflow-clip">
                
                <img className="object-cover" src={thumbnail}/>
            </div>
            <div className="p-2 h-2/5 ">
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 truncate dark:hover:text-white h-1/2">
                    {title}
                </h3>
                <p className="mt-3 text-gray-500 ">
                    {channelTitle}
                </p>
            </div>
            
        </div>
        </Link>
        
    )
}

export default VideoCard
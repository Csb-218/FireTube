import React from 'react'
import Link from 'next/link'

const ChannelCard = ({title,thumbnail,description,channelId}) => {
    console.log(thumbnail)
    return (
        <Link href={`/channel/${channelId}`}>
        <div className="bg-white border rounded-xl shadow-sm sm:flex dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden pt-[40%] sm:rounded-l-xl sm:max-w-[15rem] md:rounded-tr-none md:max-w-xs">
                <img className="w-full h-full absolute top-0 left-0 object-cover rounded-full" 
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
                    <div className="mt-5 sm:mt-auto">
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
import React from 'react'
import{useQuery} from '@tanstack/react-query'
import { channelById } from '@/API/Api'
import stats from '../../utils/stats'

const SearchVideoCard = ({videoId, videoData,thumbnail, title, description, channelTitle,channelId}) => {

    const {data:channelData} = useQuery({
        queryKey:['channelId',channelId],
        queryFn:() => channelById(channelId),
        enabled: !!channelId
    })

    const views = videoData?.statistics?.viewCount
    
    const channelProfile = channelData?.snippet?.thumbnails?.high?.url
    return (
         
        <>
        {/* {console.log(videoData)} */}
            <div className=" w-full h-full  bg-transparent  shadow-sm flex flex-col sm:flex-row ">
                <div className=" bg-amber-500 lg:w-1/3 rounded-t-xl sm:rounded-l-xl ">
                    <img className="w-full h-full  object-scale-down" src={thumbnail} alt="Image Description" />
                </div>
                <div className="flex flex-wrap lg:py-10 ">
                    <div className="p-4 flex flex-col h-full sm:p-7">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {title}
                        </h3>
                        <p className="mt-1 text-gray-800 dark:text-gray-400 sm:truncate ">
                            {description}
                        </p>
                        <div className='flex space-x-4'>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {stats(views)} views
                        </p>
                        
                        </div>
                        <div className=" flex items-center gap-x-4 py-4 sm:hidden">
                            <img src={channelProfile}
                            className='w-12 h-12 rounded-full'
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                {channelTitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchVideoCard
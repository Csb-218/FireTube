import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { videoById } from '@/API/Api'
import Link from 'next/link'
import stats from '@/utils/stats'

const SuggestedVideoCard = ({thumbnail,title,channel,id}) => {

    const{data:video}=useQuery({
        queryKey: ['video',id],
        queryFn:()=> videoById(id),
        enabled:!!id
    })

    const views = video?.statistics.viewCount

  return (
    <Link href={`/video/${id}`}>
        <div className=" lg:h-1/6  border-[0px] border-gray-500 flex gap-x-1 my-1 rounded-xl overflow-clip hover:shadow-sm  transition-transform ">
        <div className="w-1/2 ">
          <img 
          src={`${thumbnail}`}
          className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-1/2 py-4 grid grid-cols-1 gap-y-1 content-center   ">
           {/* <p>{title.length > 58 ? `${title.slice(0,58)}...` : title}</p> */}
           <p className=" text-base h-1/3 bg-green-600">
            {title.length > 65 ? `${title.slice(0,65)}...` : title}
          </p>
           <p className='lg:text-xs text-sm dark:text-gray-300  '>{channel}</p>
           <p className="text-xs dark:text-gray-300 ">{stats(views)} views</p>
        </div>
    </div>
    </Link>
    
  )
}

export default SuggestedVideoCard
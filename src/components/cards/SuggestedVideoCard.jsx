import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { videoById } from '@/API/Api'
import Link from 'next/link'

const SuggestedVideoCard = ({thumbnail,title,channel,id}) => {

    const{data:video}=useQuery({
        queryKey: ['video',id],
        queryFn:()=> videoById(id),
        enabled:!!id
    })

    const views = video?.statistics.viewCount

  return (
    <Link href={`/video/${id}`}>
        <div className=" lg:h-1/6   flex gap-x-1 my-1 rounded-xl overflow-clip hover:shadow-sm border-2 hover:shadow-gray-500 transition-transform ">
        <div className="w-1/2  bg-orange-500 ">
          <img 
          src={`${thumbnail}`}
          className="w-full h-full object-cover"
          />
          
        </div>
        <div className="w-1/2 grid grid-cols-1 gap-y-1 content-center   ">
           {/* <p>{title.length > 58 ? `${title.slice(0,58)}...` : title}</p> */}
           <p className=" sm:h-full  overflow-hidden text-ellipsis">{title}</p>
           <p className='lg:text-xs text-lg  '>{channel}</p>
           <p className="lg:text-xs ">{views} views</p>
        </div>
    </div>
    </Link>
    
  )
}

export default SuggestedVideoCard
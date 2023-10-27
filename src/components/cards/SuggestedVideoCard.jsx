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
        <div className=" h-1/6 flex gap-x-1">
        <div className="w-1/2 ">
          <img 
          src={`${thumbnail}`}
          clasName="object-fill"
          />
          
        </div>
        <div className="w-1/2 space-y-2 py-4 ">
           <p>{title.length > 38 ? `${title.slice(0,38)}...` : title}</p>
           <p className='text-xs '>{channel}</p>
           <p className="text-xs ">{views} views</p>
        </div>
    </div>
    </Link>
    
  )
}

export default SuggestedVideoCard
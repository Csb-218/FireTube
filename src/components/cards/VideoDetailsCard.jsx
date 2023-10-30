import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { videoById, channelById } from '@/API/Api'
import { useQuery,useQueries } from '@tanstack/react-query'
import Months from '@/utils/Months';
import YouTube from "react-youtube"; 


const VideoDetailsCard = ({ videoID }) => {
    const router = useRouter()

    const queryResults = useQueries({
        queries:[
            {
            queryKey: ['video', videoID],
            queryFn: () => videoById(videoID),
            enabled: !!videoID
            }
        ]
    })
    let videoResults = queryResults?.[0].data
    // let suggestedVideos = queryResults?.[1].data
    let channelId = videoResults?.snippet?.channelId

    const { data: channelResults, status } = useQuery(
        {
            queryKey: ['channel', channelId],
            queryFn: () => channelById(channelId),
            enabled: !!channelId
        }
    )
    
    const months = Months()
    const premieredDate = (date) =>{
        const d = new Date(date)
        const month = months[d.getMonth()] 
        const year = d.getFullYear()
        const day = d.getDate()

        return `${month} ${day}, ${year} `
    }
    const opts = { 
        height: "700", 
        width: "1175", 
        playerVars: { 
          autoplay: 1, 
        }, 
      }; 

    return (
        <>
        
            {/* video section */}
            <div className="h-full w-full flex flex-col gap-y-2  ">
                {/* video player */}
                <iframe
                    id="ytplayer"
                    type='text/html'
                    src={`http://www.youtube.com/embed/${videoID}?autoplay=1&enablejsapi=1`}
                    className='w-full lg:h-3/4 h-[300px] rounded-xl'
                />

                 {/* className={'w-0'} */}
                {/* <div className='w-full h-3/4  rounded-xl'> */}
                 {/* <YouTube 
                 videoId={`${videoID}`}
                 opts={opts}
                 /> */}
                {/* </div> */}
                
                <div className="w-full h-auto px-4 text-3xl">
                    <p>{videoResults?.snippet.title}</p>
                </div>
                
                {/* channel details */}
                <div className='w-full h-auto p-4 rounded-xl '>
                    <div className='flex gap-x-10 items-center cursor-pointer' onClick={()=> router.push(`/channel/${channelId}`)}>
                        <img
                            src={`${channelResults?.snippet.thumbnails.high.url}`}
                            className="w-12 h-12 rounded-full border-2"
                            alt="" 
                        />
                        <div>
                            <p className="text-xl">{channelResults?.snippet.title}</p>
                            <p className="text-xs text-slate-300">{channelResults?.statistics.subscriberCount} subscribers</p>
                        </div>
                    </div>
                </div>
                {/* video description */}
                <div className='w-full lg:h-1/5 h-60 overflow-scroll rounded-xl bg-neutral-700 p-4'>
                    <p>{videoResults?.statistics.viewCount} views premiered on {premieredDate(videoResults?.snippet.publishedAt)}</p>
                    <p>{videoResults?.snippet.description}</p>
                </div>


                {/* {console.log(suggestedVideos)} */}
            </div>
        
        </>

    )
}

export default VideoDetailsCard
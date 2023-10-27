import { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { videoById } from '@/API/Api'
import Navbar from '@/components/Navbar'
import { suggestedVideosById } from '@/API/Api'
import Constants from '../../utils/Constants'
import VideoDetailsCard from '@/components/cards/VideoDetailsCard'
import SuggestedVideoCard from '@/components/cards/SuggestedVideoCard'
import { useQuery, useQueries } from '@tanstack/react-query'



const video = () => {

  const sidebar_items = Constants()
  const [select, setSelect] = useState(sidebar_items[0].id)
  const router = useRouter()
  const { id } = router.query

  const { data: suggestedVideos } = useQuery(
    {
      queryKey: ['suggested_videos', id],
      queryFn: () => suggestedVideosById(id),
      enabled: !!id
    }
  )

  return (
    <>
      <Navbar />

      <div className='p-4 h-screen flex gap-x-2 '>
        <div className="w-3/4">
          <VideoDetailsCard videoID={id} />
        </div>
        <div className="w-1/4 h-full overflow-scroll">
          {
            suggestedVideos?.map(video => {
              console.log(video)
              const thumbnail = video?.snippet?.thumbnails?.high?.url
              const title = video?.snippet?.title
              const channel = video?.snippet?.channelTitle
              const id = video?.id?.videoId
              return (
                <SuggestedVideoCard
                  thumbnail={thumbnail}
                  title={title}
                  channel={channel}
                  id={id}
                  key={id}
                />
              )
            })
          }

        </div>

      </div>


    </>

  )
}

export default video





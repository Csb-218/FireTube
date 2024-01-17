import { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { videoById } from '@/services/Api'
import Navbar from '@/components/Navbar'
import { suggestedVideosById ,videoComments} from '@/services/Api'
import Constants from '../../utils/Constants'
import VideoDetailsCard from '@/components/cards/VideoDetailsCard'
import SuggestedVideoCard from '@/components/cards/SuggestedVideoCard'
import { useQuery, useQueries } from '@tanstack/react-query'
import Sugg_Skeleton from '@/components/skeletons/Sugg_Skeleton'
import CommentSection from '@/components/chat/CommentSection'



const video = () => {
  

  const {sidebar_items} = Constants()
  const [select, setSelect] = useState(sidebar_items[0].id)
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  const { data: suggestedVideos } = useQuery(
    {
      queryKey: ['suggested_videos', id],
      queryFn: () => suggestedVideosById(id),
      enabled: !!id,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false

    }
  )

  


  return (
    <>

      <div className='p-4  h-auto flex flex-col lg:flex-row lg:gap-x-2  lg:w-auto w-full   '>
        <div className="flex flex-col lg:w-3/4 w-full   ">
          <div className="">
            <VideoDetailsCard videoID={id} />
          </div>
          <div className="h-auto  rounded-md">
            <CommentSection videoId={id}/>
          </div>
        </div>
        
        <div className="lg:w-1/4 md:w-full sm:w-full h-full overflow-scroll p-1 ">
          { 
            suggestedVideos?
            suggestedVideos?.map(video => {
              // console.log(video)
              const hres_thumbnail = video?.snippet?.thumbnails?.high?.url
              const default_thumbnail = video?.snippet?.thumbnails?.default?.url
              const title = video?.snippet?.title
              const channel = video?.snippet?.channelTitle
              const id = video?.id?.videoId
              return (
                <SuggestedVideoCard
                  thumbnail={hres_thumbnail?hres_thumbnail:default_thumbnail}
                  title={title}
                  channel={channel}
                  id={id}
                  key={id}
                />
              )
            })
            :
            sidebar_items.map(item => <Sugg_Skeleton key={item.id}/>)
            
          }

        </div>

      </div>


    </>

  )
}

export default video





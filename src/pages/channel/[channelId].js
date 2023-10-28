import React from 'react'
import { useQueries } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { channelById,videosByChannel,channelPlaylists } from '@/API/Api'
import Navbar from '@/components/Navbar'
import Channel_tabs from '@/components/tabs/Channel_tabs'

const channelId = () => {

  const router = useRouter()
  const { channelId } = router.query

  const results = useQueries({
    queries: [
      {
        queryKey: ['channelId', channelId],
        queryFn: () => channelById(channelId),
        enabled: !!channelId
      },
      {
        queryKey: ['channelVideos', channelId],
        queryFn: () => videosByChannel(channelId),
        enabled: !!channelId
      },
      {
        queryKey: ['channelPlaylists', channelId],
        queryFn: () => channelPlaylists(channelId),
        enabled: !!channelId
      }
    ]

  })
  
  const channelDetails = results?.[0].data
  const channelVideos = results?.[1].data
  const Playlists = results?.[2].data


  console.log(results)

  return (
    <>
      <div>
        <Navbar />

        <div className="  p-2 flex justify-center">
          <img
            src={`${channelDetails?.brandingSettings?.image?.bannerExternalUrl}`}
            className='w-1/3'
          />
        </div>

        <div className="p-2 flex">
          <img
            src={`${channelDetails?.snippet?.thumbnails?.high?.url}`}
            className='w-36 rounded-full'
          />
          <div>
            <p>{channelDetails?.snippet?.title}</p>
            <p className="text-stone-500">
              {channelDetails?.snippet?.customUrl} .
              {channelDetails?.statistics?.subscriberCount} subscribers .
              {channelDetails?.statistics?.videoCount} videos</p>
          </div>
        </div>

        <Channel_tabs 
        channelVideos={channelVideos}
        channelPlaylists={Playlists}
        channelDetails={channelDetails}
        />


      </div>
    </>

  )
}

export default channelId
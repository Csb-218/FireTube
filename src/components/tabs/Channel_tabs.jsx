import React from 'react'
import VideoCard from '../cards/VideoCard'
import PlaylistCard from '../cards/PlaylistCard'

const Channel_tabs = ({ channelVideos,channelPlaylists,channelDetails}) => {
    return (
        <>
            <div className="p-2">
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                        <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 active" id="tabs-with-underline-item-1" data-hs-tab="#tabs-with-underline-1" aria-controls="tabs-with-underline-1" role="tab">
                            Videos
                        </button>
                        <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600" id="tabs-with-underline-item-2" data-hs-tab="#tabs-with-underline-2" aria-controls="tabs-with-underline-2" role="tab">
                            Playlists
                        </button>
                        <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600" id="tabs-with-underline-item-3" data-hs-tab="#tabs-with-underline-3" aria-controls="tabs-with-underline-3" role="tab">
                            About
                        </button>
                    </nav>
                </div>

                <div className="mt-3 ">
                    <div id="tabs-with-underline-1" role="tabpanel" aria-labelledby="tabs-with-underline-item-1">

                        <div className="max-w-[105rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                            <div className="grid grid-cols-2  sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6 ">
                                {
                                    channelVideos?.map(video =>
                                        <VideoCard
                                            key={video.id.videoId}
                                            videoId={video.id.videoId}
                                            videoData={video}
                                            thumbnail={video.snippet.thumbnails.high.url}
                                            title={video.snippet.title}
                                            description={video.snippet.description}
                                            channelTitle={video.snippet.channelTitle}
                                        />
                                    )
                                }
                            </div>
                        </div>

                    </div>
                    <div id="tabs-with-underline-2" className="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-2">
                        <div className="max-w-[105rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                            <div className="grid grid-cols-2  sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6">
                                {
                                    channelPlaylists?.map(playlist =>
                                        <PlaylistCard
                                         key={playlist.id}
                                         playlist={playlist}s
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div id="tabs-with-underline-3" className="hidden" role="tabpanel" aria-labelledby="tabs-with-underline-item-3">
                        <p className="text-xl p-2">Description</p>
                        <p className="py-4 px-2">
                            {channelDetails?.snippet?.description}
                        </p>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Channel_tabs
import React from 'react'

const PlaylistCard = ({ playlist }) => {
    console.log(playlist)
    return (
        <>
            <a className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]" href="#">

                <div className=" relative">
                    
                    <img
                        className="w-full h-auto rounded-t-xl"
                        src={`${playlist?.snippet?.thumbnails?.maxres?.url}`}
                        alt="Image Description"
                    />
                    <p className="absolute right-2 bottom-1 bg-yellow-500 bg-opacity-50 rounded-md text-sm p-1">{playlist?.contentDetails.itemCount} videos</p>
                </div>

                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {playlist?.snippet?.title}
                    </h3>
                    <p className="mt-1 text-gray-800 dark:text-gray-400">
                        view full playlist
                    </p>
                </div>
            </a>
        </>
    )
}

export default PlaylistCard
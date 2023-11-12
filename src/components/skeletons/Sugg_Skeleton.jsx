import React from 'react'

const Sugg_Skeleton = () => {
    return (
        <div className="flex animate-pulse pb-2">
           <div className='bg-slate-900 p-3 h-52 w-full rounded-xl flex flex-col space-y-5 '>
             <div className='bg-slate-700 h-2/3 w-full rounded-xl '> </div>
             <div className='bg-slate-700 h-1/6 w-full rounded-xl '></div>
           </div>
        </div>
    )
}

export default Sugg_Skeleton
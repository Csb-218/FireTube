import React from 'react'

const CardSkeleton = () => {
    return (

        <div className="group flex h-52 flex-col space-y-1 animate-pulse shadow-sm rounded-xl ">
         
         <div className="h-3/5 bg-gray-800 rounded-xl"></div>
         
         <div className="flex flex-col  space-y-4 p-4 h-2/5 bg-gray-800 rounded-xl">
            <div className="h-2/5 w-4/5 bg-gray-600 rounded-xl"> </div>
            <div className="h-2/5 w-2/5 bg-gray-600 rounded-xl"></div>
         </div>
        
        </div>
    )
}

export default CardSkeleton
import React from 'react'

const ErrorBlock = () => {
    return (
        
           
                <div className="flex flex-col mx-auto w-screen h-full my-20">
                    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">403</h1>
                        <h1 className="block text-2xl font-bold text-white"></h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">Oops, error loading videos.</p>
                        <p className="text-gray-600 dark:text-gray-400">We will inform you as soon as we get back.</p>
                        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                            
                        </div>
                    </div>

                    <footer className="mt-auto text-center py-5">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <p className="text-sm text-gray-500">© All Rights Reserved. 2022.</p>
                        </div>
                    </footer>
                </div>
     
    )
}

export default ErrorBlock
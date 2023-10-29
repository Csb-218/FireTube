import { Offside } from 'next/font/google'
import { useContext } from 'react'
import OffCanvas from './OffCanvas'
import { FeedContext } from '../pages/_app'
import { useRouter } from 'next/navigation'



function Navbar() {

    const { select, setSelect, sidebar_items } = useContext(FeedContext)
    const router = useRouter()

    return (
        <>
            <header className="flex flex-wrap w-[500px] lg:w-full sm:flex-nowrap  z-50 text-sm py-4 dark:bg-gray-800">
                <div className="lg:block hidden">
                   <OffCanvas />
                </div>
               
                <nav className=" w-full  mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                    <div className="flex items-center lg:justify-start justify-between w-full">
                        <a className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white" href="#">
                            <div className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="red" className="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                                </svg>
                            </div>
                            FireTube
                        </a>

                        <input type="text" className=" mx-10 py-3 px-4 block border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Search a video" />

                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-image-and-text-1" aria-controls="navbar-image-and-text-1" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                                <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="navbar-image-and-text-1" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                        <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
                            {/* <a className="font-medium text-blue-500" href="#" aria-current="page">Landing</a> */}
                            {/* <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" href="#">Account</a> */}
                            {/* <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" href="#">Work</a> */}
                            {/* <a className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" href="#">Blog</a> */}
                            {
                                sidebar_items && sidebar_items.map(item => {
                                    return (
                                        <div
                                            key={sidebar_items.indexOf(item)}
                                            className={select === item.id ? "selected_tab_sm cursor-pointer " : "unselected_tab_sm cursor-pointer  "}
                                            onClick={() => {
                                                setSelect(item.id)
                                                router.push('/')
                                            }}>
                                            <div>
                                                {item.icon}
                                            </div>
                                            {item.tab}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </nav>
            </header>




        </>

    )
}

export default Navbar
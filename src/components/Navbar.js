'use client';
import { useUser } from '@auth0/nextjs-auth0/client'
import { Offside } from 'next/font/google'
import { useContext } from 'react'
import { useFormik } from 'formik';
import OffCanvas from './OffCanvas'
import { FeedContext } from '../pages/_app'
import { useRouter } from 'next/navigation'



function Navbar() {

    const { select, setSelect, sidebar_items, search_term, setSearch_term, setFeed } = useContext(FeedContext)
    const router = useRouter()
    const { user, error, isLoading } = useUser();

    const formik = useFormik({
        initialValues: {
            searchInput: '',
        },
        onSubmit: values => {
            router.push('/')
            setSearch_term(() => values.searchInput)
            setSelect()
            setFeed('search')
            //   alert(JSON.stringify(values, null, 2));
        },
    })

    return (
        <>
            <header className="flex flex-wrap w-[500px] lg:w-full sm:flex-nowrap  z-50 text-sm py-4 dark:bg-gray-800 sticky top-0">
                

                <nav className=" w-full  mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                    <div className="lg:block hidden mr-4">
                    <OffCanvas />
                    </div>
                    <div className="flex items-center lg:justify-start justify-between w-full">
                        <a className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white" href="/">
                            <div className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="red" className="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                                </svg>
                            </div>
                            FireTube
                        </a>

                        <form onSubmit={formik.handleSubmit}>

                            <div className='inline-flex bg-black rounded-full mx-10'>
                                <input
                                    name='searchInput'
                                    type="text"
                                    className=" py-3 bg-black border-0 rounded-s-full text-sm "
                                    onChange={formik.handleChange}
                                    value={formik.values.searchInput}

                                />

                                <button type="submit"
                                    // onClick={setSearch_term(formik.values.searchInput)}
                                    className="py-3 px-3  inline-flex justify-center items-center gap-2 rounded-e-full border-0 font-semibold  hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                            </div>


                        </form>

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
                    <div className="hs-dropdown relative inline-flex">
                        <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                            {
                                user ?
                                    <img className="w-8 h-auto rounded-full" src={user?.picture} alt="Maria" />
                                    :
                                    <span className="inline-block h-[2.375rem] w-[2.375rem] bg-gray-100 rounded-full overflow-hidden">
                                        <svg className="h-full w-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
                                            <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor" />
                                            <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor" />
                                        </svg>
                                    </span>

                            }

                            <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">{user?.name}</span>
                            <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-trigger">
                            {
                                user ?
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="/api/auth/logout">
                                        LogOut
                                    </a> :
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="/api/auth/login">
                                        Login / SignUp
                                    </a>
                            }
                        </div>
                    </div>
                </nav>
            </header>




        </>

    )
}

export default Navbar
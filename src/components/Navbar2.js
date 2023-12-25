
import { useUser } from '@auth0/nextjs-auth0/client'
// import { Offside } from 'next/font/google'
import { useQuery } from '@tanstack/react-query';
import { useContext,useState } from 'react'
import { useFormik } from 'formik';
import OffCanvas from './OffCanvas'
import { FeedContext } from '../pages/_app'
import { useRouter } from 'next/navigation'
import { GoogleAuth, GoogleAuth2 ,OAuthRedirect } from '@/API/Api';


function Navbar2() {

    const { select, setSelect, sidebar_items } = useContext(FeedContext)
    const router = useRouter()
    const { user, error, isLoading } = useUser();
    const [login,setLogin] = useState(false)
    console.log(user)

    const formik = useFormik({
        initialValues: {
            searchInput: '',
        },
        onSubmit: values => {
            if(values.searchInput.length > 0){
            router.push(`/search/${values.searchInput}`)
            setTerm(() => values.searchInput)
            setSelect()
            }
           
            //   alert(JSON.stringify(values, null, 2));
        },
    })

    const resDate = useQuery({
        queryKey:['none'],
        queryFn:()=>GoogleAuth(),
        enabled:login,
        onSuccess:()=>setLogin(false)

    })

   

    // console.log(data,resError)

    return (
        <>
            <header className="flex lg:h-16 h-14 sticky top-0 flex-wrap sm:justify-start sm:flex-nowrap z-50 w-screen bg-white text-sm py-4 dark:bg-black">
                <nav className=" w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between " aria-label="Global">
                    <div className="lg:block hidden mr-4">
                        <OffCanvas />
                    </div>
                    <div className="flex items-center justify-between  w-11/12">

                        <a className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white  w-1/4" href="/">
                            <div className="bg-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="red" className="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                                </svg>
                            </div>
                            FireTube
                        </a>
                        {/* searchbox */}
                        <div className='lg:block hidden w-3/4'>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='inline-flex bg-neutral-800 rounded-full w-full border-[0.5px] border-neutral-500'>
                                    <input
                                        name='searchInput'
                                        type="text"
                                        className=" bg-black border-0 rounded-s-full text-sm w-11/12 px-8"
                                        onChange={formik.handleChange}
                                        value={formik.values.searchInput}
                                    />
                                    <button type="submit"
                                        className="py-3 px-3  inline-flex justify-center items-center gap-2 rounded-e-full border-0 font-semibold  hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* hamburger menu */}
                        <div className="sm:hidden">
                            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200  text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                                <svg className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                <svg className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                        <div className="flex flex-col gap-3 mt-1 py-2 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5 bg-black">
                            {/* searchbox */}
                        <div className='lg:hidden w-11/12'>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='inline-flex bg-neutral-800 rounded-full w-full border-[0.5px] border-neutral-500'>
                                    <input
                                        name='searchInput'
                                        type="text"
                                        className=" bg-black border-0 rounded-s-full text-sm w-11/12 px-8"
                                        onChange={formik.handleChange}
                                        value={formik.values.searchInput}
                                    />
                                    <button type="submit"
                                        className="py-3 px-3  inline-flex justify-center items-center gap-2 rounded-e-full border-0 font-semibold  hover:text-white hover:bg-red-500 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                            {
                                sidebar_items && sidebar_items.map(item => {
                                    return (
                                        <div
                                            key={sidebar_items.indexOf(item)}
                                            className={select === item.id ? "selected_tab_sm cursor-pointer " : "unselected_tab_sm cursor-pointer  "}
                                            onClick={() => {
                                                setSelect(item.id)
                                                router.push(`/category/${item.tab}`)
                                            }}>
                                            <div>
                                                {item.icon}
                                            </div>
                                            {item.tab}
                                        </div>
                                    )
                                })
                            }
                            <div className="hs-dropdown relative lg:hidden inline-flex ">
                                <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
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
                        </div>
                    </div>
                    <div className="hs-dropdown relative  hidden lg:flex">
                        <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
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

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-900 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-trigger">
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
                    <div className="hs-dropdown relative  hidden lg:flex">
                        <button id="hs-dropdown-custom-trigger" type="button" className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
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

                        <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-900 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-custom-trigger">
                            {
                                user ?
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="/api/auth/logout">
                                        LogOut
                                    </a> 
                                    :
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="/api/auth/login">
                                       Login / SignUp
                                    </a>
                                    // <button
                                    // // onClick={()=>GoogleAuth2()}
                                    // onClick={()=>user?OAuthRedirect(user?.email):alert()}
                                    // className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    // >
                                    //     login/signup

                                    // </button>
                            }
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar2
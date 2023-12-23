import { useEffect, Fragment } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { videoComments, comment } from '@/API/Api'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useFormik } from 'formik'

const CommentSection = ({ videoId }) => {

    const handleScroll = async () => {
        try {
            const scrollHeight = document.documentElement.scrollHeight
            const scrolledBy = window.scrollY
            const innerHeight = window.innerHeight
            if ((scrolledBy + innerHeight + 50) >= scrollHeight) {
                fetchComments()
            }

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

    }, [])

    const { user, error, isLoading , } = useUser();

    const {
        data: comments,
        error: commentError,
        isError: isCommentError,
        fetchNextPage: fetchComments,
        hasNextPage: hasNextComments,
        isFetching: isCommentFetching,
        isLoading: isCommentLoading,
        isFetchingNextPage: isFetchingNextComments,
        status: commentsStatus

    } = useInfiniteQuery(
        {
            queryKey: ['comments', videoId],
            queryFn: ({ pageParam = undefined }) => videoComments(pageParam, videoId),
            getNextPageParam: (lastPage, pages) => lastPage?.nextPageToken ? lastPage.nextPageToken : undefined,
            enabled: !!videoId,
            onSuccess: (d) => console.log(d),
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    )

    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        onSubmit: values => {
            console.log(values)
           comment(values?.comment,videoId,'csb')
           
            //   alert(JSON.stringify(values, null, 2));
        },
    })


    // console.log(comments)
    return (
        <>
            {/* container */}
            <div className=" h-full">
                {/* user comment container input  */}
                <div className=" flex space-x-5 m-6">
                    {/* image */}
                    {
                        user ?
                            <img className="rounded-full h-10 w-10 " src={user?.picture} />
                            :
                            <span className="inline-block h-[2.375rem] w-[2.375rem] bg-gray-100 rounded-full overflow-hidden">
                                <svg className="h-full w-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
                                    <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor" />
                                    <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor" />
                                </svg>
                            </span>
                    }

                    {/* comment body */}
                    <div className='flex flex-col space-y-2 w-full'>
                        {/* <p className='text-xs text-stone-500'>{none}</p> */}
                        {/* <div className="flex justify-between items-center">
                            <label for="hs-autoheight-textarea" className="block text-sm font-medium mb-2 dark:text-white">Add a comment </label>
                            <span className="block text-sm text-gray-500 mb-2"> 100 characters</span>
                        </div> */}
                        <form onSubmit={formik.handleSubmit}>

                            <textarea
                                name='comment'
                                className="py-1 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-blue-500 focus:border-t-transparent focus:border-x-transparent focus:border-b-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 dark:focus:border-b-gray-600"
                                rows="1"
                                placeholder="Comment "
                                onChange={formik.handleChange}
                                value={formik.values.comment}
                            />


                            <div className='flex justify-end'>
                                <button type="reset" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    Cancel
                                </button>
                                <button type="submit" className="py-2 px-4 w-auto inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    Comment
                                </button>
                            </div>
                        </form>
                    </div>


                </div>
                {
                    isCommentLoading ?
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        comments?.pages?.map(page => {
                            return (
                                page?.items?.map(comment => {
                                    return (
                                        <Fragment key={comment?.etag}>
                                            {/* comment container  */}
                                            <div className=" flex space-x-5 m-6">
                                                {/* image */}
                                                <img className="rounded-full h-10 w-10 " src={`${comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}`} />
                                                {/* comment body */}
                                                <div className='flex flex-col space-y-2'>
                                                    <p className='text-xs text-stone-500'>{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</p>
                                                    <p className={
                                                        // comment?.snippet?.topLevelComment?.snippet?.textDisplay?.length > 100 &&
                                                        'overflow-hidden'}>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</p>

                                                </div>


                                            </div>
                                        </Fragment>
                                    )
                                })
                            )
                        })

                }
                {
                    isCommentFetching ?
                        <div className="relative left-1/2 animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500 " role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        isCommentError ?
                            <>'Error loading comments !'</>
                            :
                            !hasNextComments ?
                                <>'No more comments'</>
                                :
                                null

                }

            </div>
        </>
    )
}

export default CommentSection
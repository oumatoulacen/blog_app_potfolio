/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
  }

function Post({ post }) {
     // userId is an object with the following properties: _id, username, avatar because of the populate method in the server
    const { _id, title, content, image, userId, category, createdAt } = post
    const [likes, setLikes] = useState([])
    const [reads, setReads] = useState(0)
    const [user, setUser] = useState({})
    const activeUserId = localStorage.getItem('userId')
    const navigate = useNavigate()

    // set the likes and reads
    useEffect(() => {
        setLikes(post.likes?.length)
        setReads(post.reads)
        }, [post.likes?.length, post.reads])
    
    // set the user
    useEffect(() => {
        const getUser = async () => {
            try {
                // userId is an object with the following properties: _id, username, avatar because of the populate method in the server, so we need to use userId._id instead of userId
                const res = await axios.get(`http://localhost:5000/users/${userId._id}`)
                setUser(res.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getUser()
    }, [userId])

    const handleLikes = async () => {
        try { 
            const res = await axios.put(`http://localhost:5000/posts/${_id}/likes/${activeUserId}`)
            setLikes(res.data.likes.length)
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const handleReads = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/posts/${_id}/reads/${userId}`)
            setReads(res.data.reads)
            // navigate to the post page
            navigate(`/posts/${_id}`)
        } catch (err) {
            console.log(err.message)
        }
    }


  return (
    <div>
        <article className="w-full first-of-type:border-t-0 lg:!border border-t border-slate-200 dark:border-slate-800/80 rounded-none lg:rounded-2xl pt-5 bg-white dark:bg-slate-950 flex flex-col gap-4 md:gap-5 md:pt-8 lg:p-6 lg:pb-5">
            <section className="flex flex-col gap-2 sm:gap-4">
                {/* user data */}
                <Link to={`/users/${user._id}`}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center justify-start gap-3">
                                <Link className="" to="/">
                                    <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
                                        <div className="">
                                            <img alt={user.username} src={getImageUrl(user.avatar)} decoding="async" data-nimg="fill" className="" loading="lazy"/>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-start items-center text-sm gap-1">
                                        <div className="flex gap-2">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">{ user.username }</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-start gap-1">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-normal"> { createdAt.slice(0, 10).replace('-', ' . ').replace('-', ' . ') } </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {/* post data */}
                <Link to={`/posts/${_id}`}>
                    <div className="flex flex-col gap-4 md:gap-5 w-full" onClick={handleReads}>
                        <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
                        <div className="flex flex-col gap-1">
                            <div>
                                <h1 className="font-heading text-base sm:text-xl font-semibold sm:font-bold  text-slate-700 dark:text-slate-200 hn-break-words cursor-pointer">{title}</h1>
                            </div>
                            <div className="hidden md:block">
                                <span
                                    className="text-base hidden font-normal text-slate-500 dark:text-slate-400 hn-break-words cursor-pointer md:line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                >
                                </span>
                            </div>
                        </div>
                        <div className="w-full rounded-xl md:rounded-lg bg-gray-100 dark:bg-gray-900 relative cursor-pointer md:basis-[180px] md:h-[108px] md:shrink-0">
                            {/* shown in sm */}
                            <div className="md:hidden">
                                <div data-radix-aspect-ratio-wrapper="" style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                                    <div style={{ position: "absolute", inset: "0px" }}>
                                        <span style={{ boxSizing: "border-box", display: "block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "absolute", inset: "0px" }}>
                                            <img alt="Architecture of my collaborative brainstorming app" src={getImageUrl(image)}  style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%", objectFit: "cover" }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* show in middle and lar  ge */}
                            <div className="hidden md:block w-full h-full">
                                <span style={{ boxSizing: "border-box", display: "block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "absolute", inset: "0px" }}>
                                    <img alt={title} src={getImageUrl(image)} className="css-5eln6m" />
                                </span>
                            </div>
                        </div>
                        </div>
                    </div>
                </Link>
            </section>
            {/* post interactions */}
            <section className="flex flex-col gap-5">
                <div className="flex flex-row items-center justify-between text-slate-600 dark:text-slate-300 text-sm">
                    <div className="flex flex-row items-center justify-start gap-2">
                        <Link to={`/posts/${_id}#comments`}>
                            <div className="group flex">
                                <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                                    <path stroke="currentColor" d="M8.709 14.155a4.793 4.793 0 0 1 5.412-6.55m-5.412 6.55a4.793 4.793 0 0 0 6.31 2.54c.1-.044.21-.06.317-.042l2.213.37c.18.03.337-.127.307-.307l-.371-2.21a.566.566 0 0 1 .041-.316 4.793 4.793 0 0 0-3.405-6.586m-5.412 6.55a5.845 5.845 0 0 1-2.682-.461.689.689 0 0 0-.385-.05l-2.695.45a.324.324 0 0 1-.373-.373l.452-2.69a.689.689 0 0 0-.05-.386 5.835 5.835 0 0 1 9.482-6.435 5.808 5.808 0 0 1 1.663 3.395" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25">
                                    </path>
                                </svg>
                                <span className="discuss pl-1">{ post.comments?.length }</span>
                                <span className="discuss pl-1">Discuss</span>
                            </div>
                        </Link>
                        <p className="font-bold text-slate-400 dark:text-slate-500">·</p>
                        <p onClick={handleLikes}>{likes} likes</p>
                        <p className="font-bold text-slate-400 dark:text-slate-500">·</p>
                        <p>{reads} reads</p>
                    </div>
                    <div className="flex-row items-center flex gap-1">
                        <div className="hidden sm:flex gap-2 items-center">
                            <Link to={`/categories/${category}` }>
                                <div className="flex justify-start items-center rounded-full px-2 py-1 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700 w-min max-w-[126px] truncate text-left">
                                    <span className="truncate">{category}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    </div>
  );
}

export default Post;

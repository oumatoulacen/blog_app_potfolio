import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
  }

  function PostDetails() {
    const activeUserId = localStorage.getItem('activeUserId')

    const [likes, setLikes] = useState([])
    const [reads, setReads] = useState(0)
    const [read, setRead] = useState(false)
    const [user, setUser] = useState({})
    const [liked, setLiked] = useState(false)
    const [post, setPost] = useState({ postId: '', title: '', content: '', image: '', userId: '', category: '', createdAt: '', likes: [], reads: 0})
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const postId = useParams().id
    const commentInputRef = useRef(null);
    
    const location = useLocation();
    const navigate = useNavigate()

    // get the comments
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/posts/${postId}/comments`)
                setComments(res.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getComments()
    }, [postId])

    useEffect(() => {
      // Focus on the comment input when the URL contains "#comments"
      if (location.hash === '#comments') {
        commentInputRef.current.focus();
      }
    }, [location]);

    // get the post data
    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/posts/${postId}`)
                setPost(res.data)
                console.log('post: ', res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getPost()
    }, [postId])


    // set the likes and reads
    useEffect(() => {
        setLikes(post.likes?.length)
        setReads(post.reads)
        }, [post.likes?.length, post.reads])
    
    // set the user
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${activeUserId}`)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [activeUserId])

    const handleLikes = async () => {
        try {
            if (liked) {
                console.log('liked', likes)
                setLiked(true)
            } else {
                console.log('liked not', likes)
                setLiked(false)
            }
            const res = await axios.put(`http://localhost:5000/posts/${postId}/likes/${activeUserId}`)
            setLikes(res.data.likes.length)
        } catch (err) {
            console.log(err.message)
        }
    }
    
    const handleReads = async () => {
        try {
            if (read) {
                navigate(`/posts/${postId}`)
                return
            }
            const res = await axios.put(`http://localhost:5000/posts/${postId}/reads/${activeUserId}`)
            setReads(res.data.reads)
            setRead(true)
            // navigate to the post page
            navigate(`/posts/${postId}`)
        } catch (err) {
            console.log(err.message)
        }
    }



    // handle comments
    const handleComment = async (e) => {
        setComment(e.target.value)
    }


    const addComment = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/posts/${postId}/comment`, { text: comment, userId: activeUserId })
            setComments(res.data)
            setComment('')
        } catch (err) {
            console.log(err.message)
        }
    }

  return (
    <div className='mx-5 sm:mx-16 md:mx-32 lg:mx-42'>
        <article className="w-full first-of-type:border-t-0 sm:!border border-t border-slate-200 dark:border-slate-800/80 rounded-none sm:rounded-2xl pt-5 bg-white dark:bg-slate-950 flex flex-col gap-4 sm:gap-5 sm:pt-8 sm:p-6 sm:pb-5">
            <section className="flex flex-col gap-2 sm:gap-4">
                {/* user data */}
                <Link to={`/users/${user._id}`}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center justify-start gap-3">
                                <a className="" href="/">
                                    <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
                                        <div className="">
                                            <img alt={user.username} src={getImageUrl(user.avatar)} decoding="async" data-nimg="fill" className="" loading="lazy"/>
                                        </div>
                                    </div>
                                </a>
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-start items-center text-sm gap-1">
                                        <div className="flex gap-2">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">{ user.username }</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-start gap-1">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-normal"> { post.createdAt?.slice(0, 10)?.replace('-', ' . ')?.replace('-', ' . ') } </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {/* post data */}
                <Link to={`/posts/${postId}`}>
                    <div className="flex flex-col gap-4 md:gap-5 w-full" onClick={handleReads}>
                        <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
                        <div className="flex flex-col gap-1">
                            <div>
                                <h1 className="font-heading text-base sm:text-xl font-semibold sm:font-bold  text-slate-700 dark:text-slate-200 hn-break-words cursor-pointer">{post.title}</h1>
                            </div>
                            <div className="hidden md:block">
                                <span
                                    className="text-base  font-normal text-slate-500 dark:text-slate-400 hn-break-words cursor-pointer"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                >
                                </span>
                            </div>
                        </div>
                        <div className="w-full rounded-xl md:rounded-lg bg-gray-100 dark:bg-gray-900 relative cursor-pointer md:basis-[180px] md:h-[108px] md:shrink-0">
                            {/* shown in sm */}
                            <div className="md:hidden">
                                <div data-radix-aspect-ratio-wrapper="" style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                                    <div style={{ position: "absolute", inset: "0px" }}>
                                        <a className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800" href="/">
                                            <span style={{ boxSizing: "border-box", display: "block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "absolute", inset: "0px" }}>
                                                <img alt="Architecture of my collaborative brainstorming app" src={getImageUrl(post.image)}  style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%", objectFit: "cover" }} />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* show in middle and lar  ge */}
                            <div className="hidden md:block w-full h-full">
                            <a className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800" href="">
                                <span style={{ boxSizing: "border-box", display: "block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "absolute", inset: "0px" }}>
                                <img alt={post.title} src={getImageUrl(post.image)} className="css-5eln6m" />
                                </span>
                            </a>
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
                        <Link href={`/posts/${postId}`}>
                            <div className="group flex">
                                <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                                    <path stroke="currentColor" d="M8.709 14.155a4.793 4.793 0 0 1 5.412-6.55m-5.412 6.55a4.793 4.793 0 0 0 6.31 2.54c.1-.044.21-.06.317-.042l2.213.37c.18.03.337-.127.307-.307l-.371-2.21a.566.566 0 0 1 .041-.316 4.793 4.793 0 0 0-3.405-6.586m-5.412 6.55a5.845 5.845 0 0 1-2.682-.461.689.689 0 0 0-.385-.05l-2.695.45a.324.324 0 0 1-.373-.373l.452-2.69a.689.689 0 0 0-.05-.386 5.835 5.835 0 0 1 9.482-6.435 5.808 5.808 0 0 1 1.663 3.395" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25">
                                    </path>
                                </svg>
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
                            <a href={`/categories/${post.category}` }>
                                <div className="flex justify-start items-center rounded-full px-2 py-1 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700 w-min max-w-[126px] truncate text-left">
                                    <span className="truncate">{post.category}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* write a comment */}
            <section className="flex flex-col gap-2 p-3 border border-b-slate-500" id="comments">
                <div className="flex items-center justify-start gap-2">
                    <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
                        <div className="">
                            <img alt={user.username} src={getImageUrl(user.avatar)} decoding="async" data-nimg="fill" className="" loading="lazy"/>
                        </div>
                    </div>
                    <textarea ref={commentInputRef} className="text-sm text-slate-700 dark:text-slate-200 rounded-lg flex-grow max-w-lg" placeholder='Write a comment...' onChange={handleComment} value={comment} required></textarea>
                </div>
                <div className="flex flex-grow gap-2">
                  <div className="fakeElement w-10 "></div>
                  <button className="bg-green-500 hover:bg-blue-700 text-white font-bold px-4 rounded" onClick={addComment}>Comment</button>
                </div>
            </section>


            {/* display comments section */}
            <section className='flex gap-4'>
                <div className="fakeElement w-10"></div>
                <div className="comments flex-grow ">
                    {
                    comments?.length > 0 && (
                        comments.map(comment => (
                        <div key={comment._id} className="flex flex-col gap-4 border border-b-blue-900 p-2">
                            <div className="flex flex-row items-center justify-start gap-2">
                            <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
                                <div className="">
                                <img alt={comment.userId?.username} src={getImageUrl(comment.userId?.avatar)} decoding="async" data-nimg="fill" className="" loading="lazy"/>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row justify-start items-center text-sm gap-1">
                                <div className="flex gap-2">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">{comment.userId?.username}</span>
                                </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-1">
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">{comment.createdAt.slice(0, 10)}</p>
                                </div>
                            </div>
                            </div>
                            <div className="flex flex-col gap-1">
                            <p className="text-sm text-slate-700 dark:text-slate-200">{comment.text}</p>
                            {/* implement likes and replies */}
                            <div className="flex flex-row items-center justify-start gap-2">
                                <div className="flex flex-row items-center gap-2">
                                <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                                    <path stroke="currentColor" d="M8.709 14.155a4.793 4.793 0 0 1 5.412-6.55m-5.412 6.55a4.793 4.793 0 0 0 6.31 2.54c.1-.044
                                    .21-.06.317-.042l2.213.37c.18.03.337-.127.307-.307l-.371-2.21a.566.566 0 0 1 .041-.316 4.793 4.793 0 0 0-3.405-6.586m-5.412 6.55a5.845 5.845 0 0 1-2.682-.461.689.689 0 0 0-.385-.05l-2.695.45a.324.324 0 0 1-.373-.373l.452-2.69a.689.689 0 0 0-.05-.386 5.835 5.835 0 0 1 9.482-6.435 5.808 5.808 0 0 1 1.663 3.395" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25">
                                    </path>
                                </svg>
                                <span className="text-slate-400 dark:text-slate-500">{comment.replies.length} replies</span>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                <span className="text-slate-400 dark:text-slate-500">{comment.likes.length} likes</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))
                        )
                    }
                </div>
            </section>
      </article>
        
    </div>
  );
}

export default PostDetails
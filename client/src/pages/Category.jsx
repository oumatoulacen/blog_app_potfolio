import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import Post from '../components/Post'

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
  }


function Category() {
    const category = useParams().category
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    // 20 categories allowed
    const categories = ['Technology', 'Science', 'Health', 'Sports', 'Music', 'Movies', 'Travel', 'Fashion', 'Food', 'Books', 'Business', 'Art', 'Design', 'Photography', 'Education', 'Fitness', 'Gaming', 'History', 'Nature', 'Politics', 'Religion', 'Space', 'Weather', 'Animals', 'Cars', 'DIY', 'Gardening', 'Home', 'Humor', 'Kids', 'Lifestyle', 'Parenting', 'Relationships', 'Self-Improvement', 'Spirituality', 'Writing', 'others']

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/categories/${category}`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }
    , [category])

    return (
        <div className='mx-10 md:mx-20'>
            {/* display categories as Link */}
            <div className="flex justify-center my-5 flex-wrap">
                {
                    categories.map((cat, index) => (
                        <Link key={index} to={`/categories/${cat}`} className={`m-2 p-2 border border-slate-300 rounded-lg ${cat === category ? 'bg-slate-300 text-white' : ''}`}>
                            {cat}
                        </Link>
                    ))
                }
            </div>
            <div className="flex justify-start border border-slate-300 rounded-lg">
                <h1 className="text-xl font-bold my-5 mx-5">
                    Category: <span className="text-green-600">{category}</span>
                </h1>
                <h1 className="text-xl font-bold my-5 mx-5">
                    Posts: <span className="text-green-600">{posts.length}</span>
                </h1>
            </div>
            <div className="flex justify-center flex-col">
                {
                    posts?.length ?
                        posts.map(post => (
                            <Post key={post._id} post={post} />
                        )) : <p className='m-2 text-blue-950 text-2xl'>No posts found</p>
                }
            </div>
        </div>
    )
}

export default Category
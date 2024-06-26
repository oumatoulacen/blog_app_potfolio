import { useState, useEffect } from 'react'
import Post from '../components/Post'
import axios from 'axios'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='mx-10 md:mx-20 lg:mx-30 flex flex-col justify-center'>
      {
      posts.map((post, index) => (
        <Post key={index} post={post} />
      ))
      }
    </div>
  )
}

export default Home
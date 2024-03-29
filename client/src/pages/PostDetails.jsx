import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function getImageUrl(name) {
  return new URL(`../assets/${name}`, import.meta.url).href
}

function PostDetails() {
  const [post, setPost] = useState([])  
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/posts/' + id)
      .then(res => setPost(res.data))
      .catch(err => console.log(err))
  }, [id])
  const {title, content, image} = {...post};
  

  return (
    <div className="container flex items-center flex-col mx-auto">
          <h5 className="text-2xl p-3 px-5 my-3 font-bold tracking-tight text-green-700 dark:text-white">
            {title}
          </h5>
          <div className="flex justify-between items-center mt-5 mx-5">
            <img src={getImageUrl(image)} alt={title} className='w-[600px] h-[400px] rounded-lg' />
          </div>
          <p className=" font-normal max-w-[600px] text-gray-700 dark:text-gray-400">
            {content}
          </p>
    </div>
  )
}

export default PostDetails



// import { Card } from 'flowbite-react';
// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// function getImageUrl(name) {
//     return new URL(`../assets/${name}`, import.meta.url).href;
// }
  
// function Post({ post }) {
//     const {_id, title, content, image} = {...post};
//     const imageUrl = getImageUrl(image);

//     return (
//         <Link to={`/posts/${_id}`} className=''>
            // <Card
            //     className="min-w-[384px] min-h-[384px] max-w-sm mb-8 mx-1 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none hover:shadow-xl transition-shadow duration-300 ease-in-out"
            //     imgAlt="alternative text"
            //     imgSrc={imageUrl}
            // >
            //     <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            //         {title}
            //     </h5>
            //     <p className="font-normal text-gray-700 dark:text-gray-400">
            //         {content}
            //     </p>
            //     {/* Read More link */}
            //     <Link to={`/posts/${_id}`} className="text-blue-500 hover:underline">
            //         Read More
            //     </Link>
            // </Card>
//         </Link>
//     );
// }

// export default Post;

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function getImageUrl(name) {
  return new URL(`../assets/${name}`, import.meta.url).href
}

function deletePost(id) {
  confirm('Are you sure you want to delete this post?') && 
  axios.delete(`http://localhost:5000/posts/${id}`)
      .then(res => {
          console.log(res.data);
          window.location.reload();
      })
      .catch(err => console.log(err.message));
}

function PostDetails() {
  const [post, setPost] = useState({ title: '', content: '', image: '', user: '' })  
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get('http://localhost:5000/posts/' + id)
      .then(res => setPost(res.data))
      .catch(err => console.log(err))
  }, [id])
  const {title, content, image, user} = {...post};
  console.log('user:', user, 'userId:', userId)

  return (
    <div className="container flex items-center flex-col mx-auto bg-slate-100">
          <div className="flex justify-between items-center mt-5 mx-5">
            <img src={getImageUrl(image)} alt={title} className='min-w-[400px] md:min-w-[600px]  lg:min-w-[800px] h-[300px]  md:h-[400px] rounded-[30px]' />
          </div>
          <h5 className="text-2xl p-3 my-3 w-[380px] sm:w-[400px] md:min-w-[600px]  lg:min-w-[800px] max-w-[600px] mx-auto flex-1 font-bold tracking-tight text-green-700 dark:text-white mt-12 pt-5 border-t-2 border-gray-300">
            {title}
          </h5>
          <p className=" font-normal p-3 my-3  w-[380px] sm:w-[400px] md:min-w-[600px]  lg:min-w-[800px] max-w-[600px] mx-auto flex-1 tracking-tigh dark:text-white mt-12 pt-5 border-t-2 border-gray-300">
            {content}
          </p>
          {user && userId === user._id && (
          <div className="flex items-center justify-between space-x-4 px-3 w-[400px] min-w-[380px] md:min-w-[600px]  lg:min-w-[800px] max-w-[600px] mt-12 pt-5 border-t-2 border-gray-300">
            <div className="space-x-3 my-5">
              <Link to={`/posts/edit-post/${id}`}>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-[100px] rounded focus:outline-none focus:shadow-outline">Edit</button>
              </Link>
              <button onClick={()=>deletePost(id)} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 w-[100px] rounded focus:outline-none focus:shadow-outline">Delete</button>
            </div>
          </div>
          )}
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

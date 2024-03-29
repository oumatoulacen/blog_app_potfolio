
import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

function Post({ post }) {
  const {_id, title, content, image} = {...post}
  return (
    <div>
        <Card className="min-w-[384px] min-h-[384px] max-w-sm max-h-sm mb-8 mx-1 bg-white dark:bg-gray-800 shadow-lg dark:shadow-none hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <img src={getImageUrl(image)} alt={title} className='max-w-sm h-[260px] rounded-lg' />

            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-ellipsis h-14">
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis h-12">
                    {content}
            </p>
            <div className="flex items-center justify-between space-x-4">
              <Link to={`/posts/${_id}`} className="text-green-600 hover:underline">Read more</Link>
              <div className="space-x-3">
                <Link to={`/posts/edit-post/${_id}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
                </Link>
                <button onClick={()=>deletePost(_id)} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
              </div>
            </div>

        </Card>
    </div>
  );
}

export default Post;
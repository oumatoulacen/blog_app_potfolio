import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
  }

export default function EditPost() {
    const [post, setPost] = useState({ title: '', content: '', image: ''});
    const [fileUpload, setFileUpload] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const imgRef = useRef(null);

    // get post by id
    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}`)
          .then((res) => {
                setPost({...res.data})
            })
          .catch(err => console.log(err))
      }, [id])
    
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let dataToSend;
            let headersToSend;
            
            if (fileUpload) {
            const formData = new FormData();
            formData.append('title', post.title);
            formData.append('content', post.content);
            formData.append('image', fileUpload);
    
            dataToSend = formData;
            headersToSend = { 'Content-Type': 'multipart/form-data' };
            } else {
            dataToSend = post;
            headersToSend = { 'Content-Type': 'application/json' };
            }
    
            await axios.put(`http://localhost:5000/posts/${id}`, dataToSend, { headers: headersToSend });
            // Redirect to the home page after creating the post
            navigate(`/posts/${id}`);
        } catch (error) {
            console.log('Something went wrong...');
            console.log(error.message);
        }
    }

    return (
        <div className=' container mx-auto flex flex-col justify-center items-center ms:min-w-[380px] ms:max-w-[400px] md:max-w-[800px] md:min-w-[600px]' >
            <h1 className="text-2xl font-bold mt-5">Edit Post</h1>
            <form onSubmit={handleSubmit} className='p-10 rounded-lg border-2 border-green-600 w-full'>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input type="text" className="form-input mt-1 block w-full" id="title" name='title' value={post.title} onChange={handleChange} required/>
                </div>
                <input className="bock mb-4" type="file" name="image" ref={imgRef} onChange={(e) => setFileUpload(e.target.files[0])} />
                { post.image && <img src={getImageUrl(post.image)} alt={post.title} className='w-full h-[300px] rounded-[30px]' /> }
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <ReactQuill theme="snow" className='h-72 mb-12' value={post.content} onChange={(value) => setPost({...post, content: value})} name='content' id="content" />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700">Image</label>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            </form>
        </div>
    );
}

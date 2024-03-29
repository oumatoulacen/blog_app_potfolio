import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
}


export default function EditPost() {
    const [post, setPost] = useState({ title: '', content: '', image: ''});
    const [image, setImage] = useState('code.jpg')
    const fileInputRef = useRef(null); // Create a ref for the file input element
    const [notification, setNotification] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const getPost = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/posts/${id}`);
            setPost(res.data);
            setImage(res.data.image);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getPost(id);
    }, [id]);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setPost({ ...post, [e.target.name]: e.target.files[0] });
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', post.title);
            formData.append('content', post.content);
            formData.append('image', post.image ? post.image : image);
            formData.append('user', localStorage.getItem('userId'));
            await axios.put('http://localhost:5000/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Clear the file input after form submission
            fileInputRef.current.value = '';
            // Clear the state
            setPost({ title: '', content: '', image: '' });
            setNotification('Post created successfully!');
            // Clear notification after 3 seconds
            setNotification('');
            // Redirect to post details page after creating the post
            navigate('/profile');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center' >
            <h1 className="text-2xl font-bold mt-5">Edit Post</h1>
            <form onSubmit={handleSubmit} className='p-10 rounded-lg border-2 border-green-600'>
                {notification && (
                    <div className="mb-4">
                        <p style={{ color: 'green' }}>{notification}</p>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input type="text" className="form-input mt-1 block w-full" id="title" name='title' value={post.title} onChange={handleChange} required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <textarea className="form-textarea mt-1 block w-full h-fit" id="content" name='content' value={post.content} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700">Image</label>
                    <input type="file" ref={fileInputRef} className="block w-full text-sm text-slate-500" id="image" name='image' onChange={handleChange}/>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
            </form>
        </div>
    );
}

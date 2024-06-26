import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from 'axios';

export default function CreatePost() {
    const [post, setPost] = useState({ title: '', content: '', image: '', category: ''});
    const fileInputRef = useRef(null); // Create a ref for the file input element
    const [notification, setNotification] = useState('');
    const categories = ['Technology', 'Science', 'Health', 'Sports', 'Music', 'Movies', 'Travel', 'Fashion', 'Food', 'Books', 'Business', 'Art', 'Design', 'Photography', 'Education', 'Fitness', 'Gaming', 'History', 'Nature', 'Politics', 'Religion', 'Space', 'Weather', 'Animals', 'Cars', 'DIY', 'Gardening', 'Home', 'Humor', 'Kids', 'Lifestyle', 'Parenting', 'Relationships', 'Self-Improvement', 'Spirituality', 'Writing', 'Others'];
    const navigate = useNavigate();
    const activeUserId = localStorage.getItem('activeUserId');

    if (!activeUserId) {
        navigate('/sign-in');
    }

    // Truncate long words
    const removeUnderscore = (word) => {
        return word.replace(/_/g, ' ')
    }

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setPost({ ...post, [e.target.name]: e.target.files[0] });
        } else {
            setPost({ ...post, [e.target.name]: e.target.value });
        }
    }

    const handleContent = (content) => {
        setPost({ ...post, content });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', removeUnderscore(post.title));
            formData.append('content', post.content);
            formData.append('image', post.image);
            formData.append('category', post.category);
            formData.append('userId', localStorage.getItem('activeUserId'));
            console.log('formData: ', formData)
            await axios.post('http://localhost:5000/posts', formData, {
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
            // Redirect to the home page after creating the post
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center mx-3'>
            <h1 className="text-2xl font-bold mt-5">Create Post</h1>
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
                    {/* select a category and handle change by setting post.category */}
                    <label htmlFor="category" className="block text-gray-700">Category</label>
                    <select name="category" id="category" className="form-select mt-1 block w-full" value={post.category} onChange={handleChange} required>
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700">Content</label>
                    <ReactQuill theme="snow" className='h-72 mb-12' value={post.content} onChange={handleContent} name='content' id="content" />
                </div>
                <div className="my-4 pt-6 sm:pt-0">
                    <label htmlFor="image" className="block text-gray-700">Image</label>
                    <input type="file" ref={fileInputRef} className="block w-full text-sm text-slate-500" id="image" name='image' onChange={handleChange} required/>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Write</button>
            </form>
        </div>
    );
}

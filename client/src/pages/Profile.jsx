import { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from '../assets/avatar.png';
import Post from '../components/Post';

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
}

const Profile = () => {
    const userId = localStorage.getItem('userId');
    // store the current user data
    const [user, setUser] = useState({});
    // store the user's posts
    const [posts, setPosts] = useState([]);

    // get the user's ID from the local storage and get the user data from the server
    useEffect(() => {
        if (!userId) {
            window.location.href = '/sign-in';
        } else {
            axios.get(`http://localhost:5000/users/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err.message));
        }
    }
    , [userId]);

    // get the user's posts from the server
    useEffect(() => {
        axios.get(`http://localhost:5000/users/${userId}/posts`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err.message));
    }, [userId]);

    return (
        <div className="container mx-auto px-6">
            <div className="flex items-center mt-16 p-5">
                <img src={user ? getImageUrl(user.avatar) : avatar} alt="" className="w-20 h-20 rounded-full" />
                <div className="ml-5">
                    <h2 className="text-xl font-bold mt-2 pr-10">{user ? user.username : 'Username'}</h2>
                    { userId === user._id ? <p className="text-gray-500">Email: {user.email}</p> : ''}
                </div>
            </div>
            <div className="mt-16 border-t-2 border-gray-300">
                <h1 className="text-2xl font-bold my-5 mx-5">
                    Posts: <span className="text-green-600">{posts.length}</span>
                </h1>
                <div className="flex justify-center flex-wrap mx-5">
                    {
                        posts ?
                            posts.map(post => (
                                <Post key={post._id} post={post} />
                            )) : <p>No posts found</p>
                    }
                </div>
            </div>
        </div>
        )
};

export default Profile;
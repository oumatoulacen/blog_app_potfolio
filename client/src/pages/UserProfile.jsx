import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import avatar from '../assets/avatar.png';
import Post from '../components/Post';

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
}

const Profile = () => {
    const activeUserId = localStorage.getItem('activeUserId');
    const id = useParams().id;
    // store the current user data
    const [user, setUser] = useState({});
    // store the user's posts
    const [posts, setPosts] = useState([]);

    // get the user's ID from the local storage and get the user data from the server
    useEffect(() => {
        if (!activeUserId) {
            window.location.href = '/sign-in';
        } else {
            axios.get(`http://localhost:5000/users/${id}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err.message));
        }
    }
    , [id, activeUserId]);

    // get the user's posts from the server
    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}/posts`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err.message));
    }, [id]);

    return (
        <div className='mx-10 md:mx-20 lg:mx-30'>
            <div className="flex flex-col md:flex-row">
                <div className="flex items-center mt-16 p-5">
                    <img src={user ? getImageUrl(user.avatar) : avatar} alt="" className="w-20 h-20 rounded-full" />
                    <div className="ml-5">
                        <h2 className="text-xl font-bold mt-2 pr-10">{user ? user.username : 'Username'}</h2>
                        { activeUserId === user._id ? <button className="text-slate-200 bg-blue-600 rounded-lg px-3 py-1 font-bold"> + follow</button> : ''}
                    </div>
                </div>
                <div className="flex md:flex-row md:mt-16 md:p-10">
                    <h3 className="text-xl font-light  mx-5">
                        <span className="text-green-600">{user.followers?.length}</span> Followers
                    </h3>
                    <h3 className="text-xl font-light mx-5">
                        Following: <span className="text-green-600">{user.following?.length}</span>
                    </h3>
                </div>
            </div>
            <div className="mt-16 border-t-2 border-gray-300">
                <h1 className="text-xl font-bold my-4 pl-8 py-2 border border-slate-400">
                    Posts: <span className="text-green-600">{posts.length}</span>
                </h1>
                <div className="flex flex-col justify-center">
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
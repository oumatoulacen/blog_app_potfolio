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
    // status of a active user folliwing the user
    const [follow, setFollow] = useState('Follow');
    // get following and followers
    const [followers, setFollowers] = useState(0);
    
    // get the user posts
    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}/posts`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err.message));
    }, [id]);

    // get the user's ID from the local storage and get the user data
    useEffect(() => {
        if (!activeUserId) {
            window.location.href = '/sign-in';
        } else {
            axios.get(`http://localhost:5000/users/${id}`)
                .then(res => {
                    setUser(res.data);
                    setFollowers(res.data.followers.length || 0);
                    if (res.data.followers.includes(activeUserId)) {
                        setFollow('Unfollow')
                    } else {
                        setFollow('Follow')
                    }

                })
                .catch(err => console.log(err.message));
        }
    }, [id, activeUserId]);

    // handel the follow/unfollow button
    const handleFollow = () => {
        const data = {
            activeUserId,
            userId: id
        };
        const url = follow === 'Unfollow' ? `http://localhost:5000/users/${id}/unfollow` : `http://localhost:5000/users/${id}/follow`;
        if (follow === 'Unfollow') {
            setFollow('Follow')
        } else {
            setFollow('Unfollow')
        }
        axios.put(url, data)
            .then(res => {
                setUser(res.data);
                setFollowers(res.data.followers.length || 0);
            }).catch(
                err => console.log(err.message)
            );
    };

    // handle Edit profile
    const handelEdit = () => {
        console.log('editing')
    }

    return (
        <div className='mx-10 md:mx-20 lg:mx-30 xl:mx-40'>
            {/* user info */}
            <div className="flex mt-10">
                <div className="flex flex-col">
                    <img src={user ? getImageUrl(user.avatar) : avatar} alt="" className="w-20 h-20 rounded-full" />
                </div>
                <div className="flex md:flex-row mt-5 ml-2 gap-4 ">
                    <h1 className="flex flex-col font-light">
                        <span className="text-green-600">{posts.length}</span>
                        <span className="">Posts</span>
                    </h1>
                    <h3 className="flex flex-col font-light ">
                        <span className="text-green-600">{followers}</span>
                        <span>Followers</span>
                    </h3>
                    <h3 className="flex flex-col font-light">
                        <span className="text-green-600">{user.following?.length}</span>
                        <span>Following</span>
                    </h3>
                </div>
            </div>
            <div className="flex flex-col items-start mt-5">
                <h3 className="text-xl mt-2">Your Name: <span className='pl-4'>{user ? user.username : 'Username'}</span></h3>
                {/* check if the user is visiting his profile or other users */}
                {
                    activeUserId === id ?
                        <button className="bg-green-600 text-white p-2 rounded-lg mt-2" onClick={handelEdit}>
                            Edit Profile
                        </button> :
                        <button className="bg-green-600 text-white p-2 rounded-lg mt-2" onClick={handleFollow}>
                            { follow }
                        </button>
                }
            </div>
            {/* edit user profile form when edit profile button clicked */}
            
            {/* user posts */}
            <div className="flex flex-col items-start mt-10 pb-2">
            {
                activeUserId === id ?
                <h2 className="text-xl font-bold">Your Posts</h2> :
                <h2 className="text-xl font-bold">{user.username}&apos;s Posts</h2>
            }
            </div>
            <div className="border-t-2 border-gray-300">
              
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
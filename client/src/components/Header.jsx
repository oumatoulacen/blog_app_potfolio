import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar } from 'flowbite-react'
import Cookies from 'js-cookie'
import axios from 'axios'

function signOut() {
    // comfirmation message
    if (!window.confirm('Are you sure you want to sign out?')) return
    localStorage.removeItem('activeUserId')
    Cookies.remove('token')
    // reload the page
    window.location.reload()
}

function getImageUrl(name) {
    return new URL(`../assets/${name}`, import.meta.url).href
}

function Header() {
    const [activeUser, setActiveUser] = useState({})
    const path = useLocation().pathname
    const activeUserId = localStorage.getItem('activeUserId')
    useEffect(() => {
        if (activeUserId) {
            axios.get(`http://localhost:5000/users/${activeUserId}`)
                .then(res => setActiveUser(res.data))
                .catch(err => console.log(err.message))
        }
    }, [activeUserId])

    return (
        <div>
            <Navbar rounded className='border-b-2 bg-gradient-to-r from-slate-500 to-green-400'>
            <Navbar.Brand as={Link} to="/">
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="LOUMAT Blog Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold
                dark:text-white text-gray-200 ">
                    LOUMAT Blog
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className=''>
                <Navbar.Link as={Link} to="/" className='text-white hover:bg-slate-400 mt-2' active={path === '/'}>Home</Navbar.Link>
                { activeUserId && <Navbar.Link as={Link} to="/create-post" className='text-white hover:bg-slate-400 mt-2' active={path === '/create-post'}>Write</Navbar.Link>}
                { !activeUserId &&  <Navbar.Link as={Link} to="/sign-in" className='text-white hover:bg-slate-400 mt-2' active={path === '/sign-in'}>Sign-in</Navbar.Link>}
                { !activeUserId && <Navbar.Link as={Link} to="/sign-up" className='text-white hover:bg-slate-400 mt-2' active={path === '/sign-up'}>Sign-up</Navbar.Link>}
                { activeUserId && <Navbar.Link as={Link} to="/" onClick={signOut} className='text-white hover:bg-slate-400 mt-2'>Sign-out</Navbar.Link>}
                <Navbar.Link as={Link} to="/contact-us" className='text-white hover:bg-slate-400 mt-2' active={path === '/contact-us'}>Contact Us</Navbar.Link>
                {/* for large screen */}
                { activeUserId && <Navbar.Link as={Link} to={`/users/${activeUserId}`} className='text-white hidden md:block' active={path === `${activeUserId}`}>
                    <img src= { getImageUrl(activeUser.avatar)} alt='Profile' className='rounded-full h-10 w-10' />
                </Navbar.Link>}
                {/* for small screen */}
                { activeUserId && <Navbar.Link as={Link} to={`/users/${activeUserId}`} className='text-white md:hidden' active={path === `${activeUserId}`}>Profile</Navbar.Link>}
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
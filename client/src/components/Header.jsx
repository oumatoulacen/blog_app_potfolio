import { Link, useLocation } from 'react-router-dom'
import { Navbar } from 'flowbite-react'
import Cookies from 'js-cookie'

function signOut() {
    // comfirmation message
    if (!window.confirm('Are you sure you want to sign out?')) return
    localStorage.removeItem('userId')
    Cookies.remove('token')
    // reload the page
    window.location.reload()
}

function Header() {
    const path = useLocation().pathname
    const activeUserId = localStorage.getItem('activeUserId')

    return (
        <Navbar rounded className='border-b-2 bg-gradient-to-r from-slate-500 to-green-400'>
        <Navbar.Brand as={Link} to="#">
            {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="LOUMAT Blog Logo" /> */}
            <span className="self-center whitespace-nowrap text-xl font-semibold
            dark:text-white text-gray-200 ">
                LOUMAT Blog
            </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Navbar.Link as={Link} to="/" className='text-white hover:bg-slate-400' active={path === '/'}>Home</Navbar.Link>
            { activeUserId && <Navbar.Link as={Link} to="/create-post" className='text-white hover:bg-slate-400' active={path === '/create-post'}>Write</Navbar.Link>}
            { activeUserId && <Navbar.Link as={Link} to="/profile" className='text-white hover:bg-slate-400' active={path === '/profile'}>Profile</Navbar.Link>}
            { !activeUserId &&  <Navbar.Link as={Link} to="/sign-in" className='text-white hover:bg-slate-400' active={path === '/sign-in'}>Sign-in</Navbar.Link>}
            { !activeUserId && <Navbar.Link as={Link} to="/sign-up" className='text-white hover:bg-slate-400' active={path === '/sign-up'}>Sign-up</Navbar.Link>}
            { activeUserId && <Navbar.Link as={Link} to="/" onClick={signOut} className='text-white hover:bg-slate-400'>Sign-out</Navbar.Link>}
            <Navbar.Link as={Link} to="/contact-us" className='text-white hover:bg-slate-400' active={path === '/contact-us'}>Contact Us</Navbar.Link>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
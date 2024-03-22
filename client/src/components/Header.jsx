import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar } from 'flowbite-react'

function Header() {
    const path = useLocation().pathname
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
            <Navbar.Link as={Link} to="/" className='text-white' active={path === '/'}>Home</Navbar.Link>
            <Navbar.Link as={Link} to="/about" className='text-white' active={path === '/about'}>About</Navbar.Link>
            <Navbar.Link as={Link} to="/sign-in" className='text-white' active={path === '/sign-in'}>Sign-in</Navbar.Link>
            <Navbar.Link as={Link} to="/sign-up" className='text-white' active={path === '/sign-up'}>Sign-up</Navbar.Link>
            <Navbar.Link as={Link} to="" className='text-white' active={path === '/contact'}>Contact</Navbar.Link>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
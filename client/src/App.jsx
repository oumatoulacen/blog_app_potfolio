// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// page imports
import Home from './pages/Home'
// import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Contact from './pages/ContactUs'
import Projects from './pages/Projects'
import UserProfile from './pages/UserProfile'
import PostDetails from './pages/PostDetails'
import ResetPassword from './pages/PasswordEdit'
import Category from './pages/Category'
import Footer from './components/Footer'
import NoPage from './pages/NoPage'


// component imports
import Header from './components/Header'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/edit-post/:id" element={<EditPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../assets/mark.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Signin() {
  const [credentials, setCredentials] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  const [loadingSignin, setLoading] = useState('Sign in')
  const [notification, setNotification] = useState('');

  // Navigate to the home page (redirect to the home page after login is successful)
  const navigate = useNavigate();


  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading('Loading...')
      // login a user
      axios.post('http://localhost:5000/auth/login', credentials)
        .then((res) => {

          console.log('response data:', res.data)
          // clear the form
          setCredentials({email: '', password: ''})
          setNotification('logged successfully!');
          localStorage.setItem('userId', res.data._id)
          // Clear notification after 3 seconds
          setTimeout(() => {
              setNotification('');
              setLoading('Sign in')
              // Redirect to the home page
              navigate('/')
          }, 1000);
        }) 
    } catch { 
      setCredentials({email: '', password: ''})
      console.log(error.message)
      setError('Failed to login')
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className='border-2 border-slate-400 rounded-lg p-14  sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Loumat"
              />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" onChange={handleChange} value={credentials.email} autoComplete="email" required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link to="/reset-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" onChange={handleChange} value={credentials.password} autoComplete="current-password" required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <h2 className="text-red-500 text-center">{error}</h2>
              <h3 className="text-green-500 text-center">{notification}</h3>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-slate-500 to-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  { loadingSignin }
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <a href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

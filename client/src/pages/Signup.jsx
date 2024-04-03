import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import logo from '../assets/mark.svg'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [credentials, setCredentials] = useState({username: '', email: '', password: '', confirmPassword: ''})
  const [error, setError] = useState('')
  const [loadingSigning, setLoading] = useState('Sign Up')
  const [notification, setNotification] = useState('')
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

      // Create a new user
      axios.post('http://localhost:5000/auth/register', credentials)
        .then((res) => {
          console.log(res.data)
          // clear the form
          setCredentials({username: '', email: '', password: '', confirmPassword: ''})
          // Clear notification after 1 seconds
          setNotification('signed up successfully!');
          // Clear notification after 3 seconds
          setTimeout(() => {
            setNotification('');
            setLoading('Sign Up')
            // Redirect to the home page
            navigate('/sign-in')
        }, 1000);
      })
    } catch {
      setCredentials({username: '', email: '', password: '', confirmPassword: ''})
      setError('Failed to create an account')
    }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
            <form className="space-y-6" action="" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input id="username" name="username" type="text" value={credentials.username} required onChange={ handleChange } className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" value={credentials.email} autoComplete="email" required onChange={ handleChange }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input id="password" name="password" type="password" value={credentials.password} autoComplete="current-password" required onChange={ handleChange }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                <input id="confirm-password" name="confirmPassword" value={credentials.confirmPassword} type="password" required onChange={ handleChange }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="text-red-500 text-center">{error}</div>
              <div className="text-green-500 text-center">{notification}</div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gradient-to-r from-slate-500 to-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  { loadingSigning }
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Have an account?{' '}
              <Link to="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign-in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

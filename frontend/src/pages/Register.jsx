import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import images from '../assets'
import authService from '../services/authService'
import Alert from '../components/Alert'

export default function Register () {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')

  const { auth } = useAuth()

  if (auth) {
    return <Navigate to="/" replace />
  }

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, email, password].includes('')) setAlert({ msg: 'All fields are required', error: true })

    if (password.length < 6) setAlert({ msg: 'The password is too short. Min 8 characters', error: true })

    try {
      const res = await authService.register({ name, email, password })

      if (res.status === 200) navigate('/login')
      if (!alert) setAlert({ msg: 'Unexpected error. try again', error: true })
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      return setAlert({ msg: err.message, error: true })
    } finally {
      setTimeout(() => {
        setAlert({})
      }, [2000])
    }
  }

  const { msg } = alert

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
            </div>
            <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Personal Finance Manager</div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">Sign up</h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="johndoe@gmail.com"
                  id="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Name
                  </div>
                </div>
                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="John Doe"
                  id="name"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                </div>
                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder="********************"
                  id="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  />
              </div>

              {msg && <Alert alert={alert}/>}

              <div className="mt-10">
                <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                  Sign up
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Do you already have an account?
              <a
                onClick={() => navigate('/login')}
                className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <div className="max-w-lg transform duration-200 hover:scale-110 cursor-pointer">
          <img src={images.register}></img>
        </div>
      </div>
    </div>
  )
}

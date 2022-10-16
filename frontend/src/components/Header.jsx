import React from 'react'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { logOut } = useAuth()

  return (
    <div className="bg-indigo-100 flex flex-col items-center justify-center">
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold w-64 py-2 px-4 rounded-full m-4"
      onClick={() => logOut()}>
      Logout
    </button>
  </div>
  )
}

export default Header

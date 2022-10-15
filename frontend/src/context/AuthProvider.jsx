import React, { useState, useEffect, createContext } from 'react'
import authService from '../services/authService'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setAuth(user)
    }
  }, [])

  const logOut = () => {
    authService.logout()
    setAuth('')
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        logOut
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext

import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import operationService from '../services/operationService'
import Operation from '../components/Operation'
import Balance from '../components/Balance'
import Modalt from '../components/Modal'
import categoryService from '../services/categoryService'

export default function Home () {
  const [operations, setOperations] = useState('')
  const [categories, setCategories] = useState('')

  const { auth, logOut } = useAuth()

  const navigate = useNavigate()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    const getOperations = async () => {
      try {
        const response = await operationService.getOperations(auth)
        if (response.status === 403) {
          logOut()
          navigate('/login')
        }

        setOperations(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getOperations()
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      const response = await categoryService.getCategories(auth)
      setCategories(response.data)
    }
    getCategories()
  }, [])

  return (
    <div className="md:flex items-center justify-center bg-indigo-100 h-screen ">
      <Modalt operations={operations} setOperations={setOperations} categories={categories}/>
      <button onClick={() => logOut()}>Logout</button>
      <Balance operations={operations}/>
      <div className="max-w mx-auto">
        <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none">Operations</h3>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              +
            </button>
          </div>
          <div>
            <ul className="divide-y divide-gray-200 lg:grid lg:grid-cols-2">
              {operations && operations.map(operation => <Operation key={operation.id} operation={operation}/>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useOperation from '../hooks/useOperation'
import useApp from '../hooks/useApp'
import { Navigate } from 'react-router-dom'
import Balance from '../components/Balance'
import Modal from '../components/Modal'
import Filters from '../components/Filters'
import OperationList from '../components/OperationList'
import Header from '../components/Header'

export default function Home () {
  const { auth } = useAuth()

  const { getOperations, getOperationsWithFilters } = useOperation()

  const { getCategories, categoryId, type } = useApp()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    getOperations()
  }, [])

  const pathGetOperations = `operations?categoryId=${categoryId}&type=${type}&page=1`

  useEffect(() => {
    getOperationsWithFilters(pathGetOperations)
  }, [pathGetOperations])

  return (
    <div>
      <Header />
      <div className="md:flex items-center justify-between bg-indigo-100 h-screen ">
        <Balance/>
        <div className="max-w mx-auto">
          <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 ">
            <div className="w-80 mx-40"></div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none">Operations</h3>
              <Modal/>
            </div>
            <Filters/>
            <OperationList />
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import operationService from '../services/operationService'
import Balance from '../components/Balance'
import Modal from '../components/Modal'
import categoryService from '../services/categoryService'
import Filters from '../components/Filters'
import OperationList from '../components/OperationList'
import Header from '../components/Header'

export default function Home() {
  const [operations, setOperations] = useState([])
  const [allOperations, setAllOperations] = useState([])
  const [updateOperation, setUpdateOperation] = useState({})
  const [categories, setCategories] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState('')

  const { auth, logOut } = useAuth()

  const navigate = useNavigate()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  const pathGetOperations = `operations?categoryId=${categoryId}&type=${type}&page=1`

  useEffect(() => {
    const getOperations = async () => {
      try {
        const response = await operationService.getOperations('operations?page=1', auth)
        if (response.status === 403) {
          navigate('/login')
          logOut()
        }

        if (!response.data) return setOperations([])
        setAllOperations(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getOperations()
  }, [])

  useEffect(() => {
    const getOperations = async () => {
      try {
        const response = await operationService.getOperations(pathGetOperations, auth)
        if (response.status === 403) {
          navigate('/login')
          logOut()
        }

        if (!response.data) return setOperations([])
        setOperations(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getOperations()
  }, [pathGetOperations])

  useEffect(() => {
    const getCategories = async () => {
      const response = await categoryService.getCategories(auth)
      setCategories(response.data)
    }
    getCategories()
  }, [])

  const deleteOperation = async (id) => {
    const res = await operationService.deleteOperation(id, auth)
    if (res.status === 200) {
      const operationsUpdated = operations.filter(operation => operation.id !== id)
      const allOperationsUpdated = allOperations.filter(operation => operation.id !== id)
      setOperations(operationsUpdated)
      setAllOperations(allOperationsUpdated)
    }
  }

  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <Header />
      <div className="md:flex items-center justify-between bg-indigo-100 h-screen ">
        <Balance
          allOperations={allOperations}
          operations={operations}
        />
        <div className="max-w mx-auto">
          <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 ">
            <div className="w-80 mx-40"></div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold leading-none">Operations</h3>
              <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                operations={operations}
                allOperations={allOperations}
                setAllOperations={setAllOperations}
                setOperations={setOperations}
                categories={categories}
                updateOperation={updateOperation}
                setUpdateOperation={setUpdateOperation}
              />
            </div>
            <Filters
              categories={categories}
              type={type}
              setType={setType}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
            <OperationList
              operations={operations}
              setOpenModal={setOpenModal}
              deleteOperation={deleteOperation}
              setUpdateOperation={setUpdateOperation}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

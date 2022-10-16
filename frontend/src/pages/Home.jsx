import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import operationService from '../services/operationService'
import Operation from '../components/Operation'
import Balance from '../components/Balance'
import Modalt from '../components/Modal'
import categoryService from '../services/categoryService'
import Filters from '../components/Filters'

export default function Home () {
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

        if (!response.data) return
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

        if (!response) return
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
      <div className="bg-indigo-100 flex flex-col items-center justify-center">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold w-64 py-2 px-4 rounded-full m-4" onClick={() => logOut()}>Logout</button>
      </div>
    <div className="md:flex items-center justify-between bg-indigo-100 h-screen ">
      <Balance allOperations={allOperations} operations={operations}/>
      <div className="max-w mx-auto">
        <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 ">
          <div className="w-80 mx-40"></div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none">Operations</h3>
            <Modalt
              openModal={openModal}
              setOpenModal={setOpenModal}
              operations={operations}
              allOperations={allOperations}
              setAllOperations={setAllOperations}
              setOperations={setOperations}
              categories={categories}
              updateOperation={updateOperation}
              setUpdateOperation={setUpdateOperation} />
          </div>
          <Filters categories={categories} type={type} setType={setType} categoryId={categoryId} setCategoryId={setCategoryId}/>
          <div>
            <ul className="divide-y divide-gray-200 lg:grid lg:grid-cols-2">
              {operations && operations.map(operation => <Operation setOpenModal={setOpenModal} key={operation.id} operation={operation} deleteOperation={deleteOperation} setUpdateOperation={setUpdateOperation} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

import React, { createContext, useState } from 'react'
import useAuth from '../hooks/useAuth'
import operationService from '../services/operationService'
import { useNavigate } from 'react-router-dom'

const OperationContext = createContext()

const OperationProvider = ({ children }) => {
  const [operations, setOperations] = useState([])
  const [allOperations, setAllOperations] = useState([])
  const [operationToUpdate, setOperationToUpdate] = useState({})

  const { auth, logOut } = useAuth()
  const navigate = useNavigate()

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

  const getOperationsWithFilters = async (path) => {
    try {
      const response = await operationService.getOperations(path, auth)
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

  const createOperation = async (operation) => {
    const res = await operationService.createOperation(operation, auth)
    if (res.status === 200) {
      setOperations([...operations, res.data])
      setAllOperations([...allOperations, res.data])
    }
  }

  const updateOperation = async (operation) => {
    const operationId = operationToUpdate.id
    const res = await operationService.updateOperation(operation, auth, operationId)

    if (res.status === 200) {
      const operationsUpdated = operations.filter(operation => operation.id !== operationToUpdate.id)
      const allOperationsUpdated = allOperations.filter(operation => operation.id !== operationToUpdate.id)
      setOperations([...operationsUpdated, res.data])
      setAllOperations([...allOperationsUpdated, res.data])
    }
    setOperationToUpdate({})
  }

  const deleteOperation = async (id) => {
    const res = await operationService.deleteOperation(id, auth)
    if (res.status === 200) {
      const operationsUpdated = operations.filter(operation => operation.id !== id)
      const allOperationsUpdated = allOperations.filter(operation => operation.id !== id)
      setOperations(operationsUpdated)
      setAllOperations(allOperationsUpdated)
    }
  }

  return (
    <OperationContext.Provider
      value={{
        getOperations,
        getOperationsWithFilters,
        operations,
        setOperations,
        allOperations,
        setAllOperations,
        createOperation,
        deleteOperation,
        updateOperation,
        operationToUpdate,
        setOperationToUpdate
      }}>
      {children}
    </OperationContext.Provider>
  )
}

export { OperationProvider }
export default OperationContext

import React, { createContext, useState } from 'react'
import useAuth from '../hooks/useAuth'
import categoryService from '../services/categoryService'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const { auth } = useAuth()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [categories, setCategories] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState('')

  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)

  const getCategories = async () => {
    const response = await categoryService.getCategories(auth)
    setCategories(response.data)
  }

  return (
    <AppContext.Provider
      value={{
        isOpenModal,
        openModal,
        closeModal,
        getCategories,
        categories,
        setCategories,
        categoryId,
        setCategoryId,
        type,
        setType
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider }
export default AppContext

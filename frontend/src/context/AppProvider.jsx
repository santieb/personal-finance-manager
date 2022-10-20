import React, { createContext, useState } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)

  return (
    <AppContext.Provider
      value={{
        isOpenModal,
        openModal,
        closeModal
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider }
export default AppContext

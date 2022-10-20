import React, { createContext } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider }
export default AppContext

import { useContext } from 'react'
import AppContext from '../context/AppProvider'

const useApp = () => useContext(AppContext)

export default useApp

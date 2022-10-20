import { useContext } from 'react'
import OperationContext from '../context/OperationProvider'

const useOperation = () => useContext(OperationContext)

export default useOperation

import React from 'react'
import Operation from '../components/Operation'

const OperationList = ({ operations, setOpenModal, deleteOperation, setUpdateOperation }) => {
  return (
    <div>
      <ul className="divide-y divide-gray-200 lg:grid lg:grid-cols-2">
        {operations && operations.map(operation => <Operation setOpenModal={setOpenModal} key={operation.id} operation={operation} deleteOperation={deleteOperation} setUpdateOperation={setUpdateOperation} />)}
      </ul>
    </div>
  )
}

export default OperationList

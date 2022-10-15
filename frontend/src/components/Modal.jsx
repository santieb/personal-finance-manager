import React, { useState } from 'react'
import Modal from 'react-modal'
import operationService from '../services/operationService'
import useAuth from '../hooks/useAuth'

const Modalt = ({ operations, setOperations, categories}) => {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)

  const [concept, setConcept] = useState()
  const [type, setType] = useState()
  const [amount, setAmount] = useState()
  const [category, setCategory] = useState()

  function openModal () {
    setIsOpen(true)
  }

  function afterOpenModal () {
    subtitle.style.color = '#f00'
  }

  function closeModal () {
    setIsOpen(false)
  }

  const { auth } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()

    if ([concept, type, category].includes('')) console.log({ msg: 'All fields are required', error: true })
    if (amount === 0) console.log('the amount is zero')

    const operation = { concept, type, categoryId: category, amount }

    const response = await operationService.createOperation(operation, auth)

    if (response.status === 200) {
      setIsOpen(false)
      setOperations([...operations, response.data])
    }
  }

  return (
    <div>
      <button onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create Operation</h2>
        <button onClick={closeModal}>close</button>
        <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">Concept</div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="text"
                  placeholder=""
                  id="concept"
                  value={concept}
                  onChange={({ target }) => setConcept(target.value)}
                 />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div
                    className="text-sm font-bold text-gray-700 tracking-wide">
                    Amount
                  </div>
                </div>
                <input
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="number"
                  id="amount"
                  placeholder="0"
                  value={amount}
                  onChange={({ target }) => setAmount(+target.value)}
                />
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div
                    className="text-sm font-bold text-gray-700 tracking-wide">
                    Type
                  </div>
                </div>
                <select onChange={({ target }) => setType(target.value)} value={type} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
                  <option value="expenses">Expenses</option>
                  <option value="incomes">Income</option>
                </select>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div
                    className="text-sm font-bold text-gray-700 tracking-wide">
                    Category
                  </div>
                </div>
                <select onChange={({ target }) => setCategory(target.value)} value={category} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
                  {categories && categories.map(category => <option key={category.id} value={category.id}>{category.categoryName}</option>)}
                </select>
              </div>

              <div className="mt-10">
                <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                  Create operation
                </button>
              </div>
            </form>
      </Modal>
    </div>
  )
}

export default Modalt

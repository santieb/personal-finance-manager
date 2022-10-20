import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import useOperation from '../hooks/useOperation'

const Modalt = ({ categories, openModal, setOpenModal }) => {
  const [concept, setConcept] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const { createOperation, updateOperation, operationToUpdate } = useOperation()

  useEffect(() => {
    if (!operationToUpdate) return

    setConcept(operationToUpdate.concept)
    setType(operationToUpdate.type)
    setAmount(operationToUpdate.amount)
    setCategory(operationToUpdate.categoryId)
  }, [operationToUpdate, openModal])

  const handleSubmit = async e => {
    e.preventDefault()

    if ([concept, type, category].includes('')) console.log({ msg: 'All fields are required', error: true })
    if (amount === 0) console.log('the amount is zero')

    const operation = { concept, type, categoryId: category, amount }

    if (operationToUpdate?.id) {
      updateOperation(operation)
    } else createOperation(operation)

    setConcept('')
    setType('')
    setAmount('')
    setCategory('')
    setOpenModal(false)
  }

  const closeModal = () => {
    operationToUpdate({})
    setOpenModal(false)

    setConcept('')
    setType('')
    setAmount('')
    setCategory('')
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => setOpenModal(true)}>
        +
      </button>
      <Modal className="lg:m-auto lg:mt-64 border-2 border-slate-500 rounded-lg lg:w-1/3 xl:max-w-screen-sm bg-white p-4"
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="flex space-beetween justify-between items-center mb-4">
          <h2 className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            {operationToUpdate?.id ? 'Update Operation' : 'Create Operation'}
          </h2>
          <button onClick={() => setOpenModal(false)}>X</button>
        </div>

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

          {operationToUpdate?.id
            ? <></>
            : <>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div
                    className="text-sm font-bold text-gray-700 tracking-wide">
                    Type
                  </div>
                </div>
                <select onChange={({ target }) => setType(target.value)} value={type} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="expenses">Expenses</option>
                  <option value="incomes">Income</option>
                </select>
              </div>
            </>}

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div
                className="text-sm font-bold text-gray-700 tracking-wide">
                Category
              </div>
            </div>
            <select onChange={({ target }) => setCategory(target.value)} value={category} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
              <option value="" selected disabled hidden>Choose here</option>
              {categories && categories.map(category => <option key={category.id} value={category.id}>{category.categoryName}</option>)}
            </select>
          </div>

          <div className="mt-10">
            <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
              {operationToUpdate?.id ? 'Update Operation' : 'Create Operation'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Modalt

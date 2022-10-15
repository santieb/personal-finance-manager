import React from 'react'

const Balance = ({ operations }) => {
  const calculateExpenses = () => {
    const totalExpenses = operations.reduce((acc, operation) => {
      if (operation.type === 'expenses') return acc + operation.amount
    }, 0)

    return totalExpenses || 0
  }

  const calculateIncome = () => {
    const totalIncome = operations.reduce((acc, operation) => {
      if (operation.type === 'income') return acc + operation.amount
    }, 0)

    return totalIncome || 0
  }

  const calculateBalance = () => calculateIncome() - calculateExpenses()

  return (
    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 flex justify-between lg:gap-10 lg:m-40">
      <div className="">
        <h1 className="text-xl font-bold leading-none">
          Balance
        </h1>
        <p>${operations ? calculateBalance() : 0}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold leading-none">
          Income
        </h1>
        <p>${operations ? calculateIncome() : 0}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold leading-none">
          Expenses
        </h1>
        <p>${operations ? calculateExpenses() : 0}</p>
      </div>
    </div>
  )
}

export default Balance

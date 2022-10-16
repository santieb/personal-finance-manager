import React, { useState, useEffect } from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Balance = ({ allOperations }) => {
  const [progress, setProgress] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [incomes, setIncomes] = useState(0)

  useEffect(() => {
    const calculateExpenses = () => {
      let totalExpenses = 0
      let totalIncomes = 0

      if (!allOperations || allOperations.length === 0) {
        setExpenses(0)
        setIncomes(0)
        setProgress(0)
        return
      }

      allOperations.forEach(operations => {
        if (operations.type === 'expenses') totalExpenses += operations.amount

        if (operations.type === 'incomes') totalIncomes += operations.amount
      })

      let progressbar = 100 - (totalExpenses / totalIncomes * 100)
      if (progressbar > 100 || progressbar < 0) progressbar = 0

      setProgress(progressbar)
      setExpenses(totalExpenses)
      setIncomes(totalIncomes)
    }

    calculateExpenses()
  }, [allOperations])

  return (
    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 flex flex-col items-center mx-auto justify-center gap-10 lg:mr-2 lg:p-10">
      <div className="flex gap-10">
      <div>
        <h1 className="text-xl font-bold leading-none py-2">
          Balance
        </h1>
        <p className="text-xl font-bold" >${incomes - expenses}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold leading-none py-2">
          Incomes
        </h1>
        <p className="text-xl font-bold text-green-600">${incomes}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold leading-none py-2">
          Expenses
        </h1>
        <p className="text-xl font-bold text-red-700">${expenses}</p>
      </div>
      </div>
      <div className='w-80 border-blue-500'>
        <CircularProgressbarWithChildren value={progress} >
        <div>
            <strong>{Math.trunc(progress)}% </strong> Remaining
          </div>
        </CircularProgressbarWithChildren >
      </div>
    </div>
  )
}

export default Balance

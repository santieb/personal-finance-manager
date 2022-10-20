import React from 'react'
import useApp from '../hooks/useApp'

const Filters = () => {
  const { categories, type, setType, categoryId, setCategoryId } = useApp()

  return (
    <div>
      <h5 className="text-sm font-bold text-gray-700 tracking-wide py-4">
        Type
      </h5>
      <button
        className={type === '' ? 'px-4 bg-green-300' : 'px-4 bg-gray-200'}
        onClick={() => setType('')}>
        None
      </button>
      <button
        className={type === 'incomes' ? 'px-4 bg-green-300' : 'px-4 bg-gray-200'}
        onClick={() => setType('incomes')}>
        Incomes
      </button>
      <button
        className={type === 'expenses' ? 'px-4 bg-green-300' : 'px-4 bg-gray-200'}
        onClick={() => setType('expenses')}>
        Expenses
      </button>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold text-gray-700 tracking-wide">
            Category
          </div>
        </div>
        <select onChange={({ target }) => setCategoryId(target.value)} value={categoryId} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
          {categories && categories.map(category => <option key={category.id} value={category.id}>{category.categoryName}</option>)}
          <option value=''>None</option>
        </select>
      </div>
    </div>
  )
}

export default Filters

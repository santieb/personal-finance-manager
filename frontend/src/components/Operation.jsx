import React from 'react'

const Operation = ({ operation }) => {
  const { amount, category, concept, type } = operation

  return (
    <li className="py-3 sm:py-4 lg:px-4">
      <div className="flex items-center space-x-2">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
            alt="Lana image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {concept}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            24 jan
          </p>
        </div>
        {type === 'expenses'
          ? <div className="inline-flex items-center text-base font-semibold text-red-500">
            - ${amount}
          </div>
          : <div className="inline-flex items-center text-base font-semibold text-green-500">
            ${amount}
          </div>
        }
      </div>
    </li>
  )
}

export default Operation

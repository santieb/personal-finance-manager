import React from 'react'

const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error
      ? 'bg-red-500'
      : 'from-sky-400 to-sky-600'} 
      text-center p-4 rounded-full text-white tracking-wide font-semibold font-display shadow-lgfont-bold text-sm my-10 focus:outline-none focus:shadow-outline hover:bg-red-600`}>
      {alert.msg}
    </div>
  )
}

export default Alert

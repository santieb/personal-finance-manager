import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { AuthProvider } from './context/AuthProvider'
import { OperationProvider } from './context/OperationProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AppProvider>
          <OperationProvider>
            <App />
          </OperationProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
)

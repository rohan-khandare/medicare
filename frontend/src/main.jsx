import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <BrowserRouter>
          <ToastContainer 
            theme='dark' 
            position='top-right' 
            autoClose={3000} 
            closeOnClick 
            pauseOnHover={false} 
          />
        <App />
        </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
)

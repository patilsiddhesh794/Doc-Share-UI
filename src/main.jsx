import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { ResetProvider } from './context/resetPass.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ResetProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
  </ResetProvider>
  </BrowserRouter>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import SignIn from './pages/sign-in/SignIn.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>,
)

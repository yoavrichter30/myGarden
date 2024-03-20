import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import SignIn from './pages/sign-in/SignIn.tsx';
import SignUp from './pages/sign-up/SignUp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App/>   
      </HashRouter>
   </React.StrictMode>,
)

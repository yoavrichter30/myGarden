import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material';
import { Outlet, Link } from "react-router-dom";

import SignIn from './pages/sign-in/SignIn.tsx'
import SignUp from './pages/sign-up/SignUp.tsx'
import baseTheme from './theme.ts';

const styles = createTheme({
  ...baseTheme,
  palette: {
    background: {
      paper: '#DAF7A6'
    },
    secondary: {
      main: '#DAF7A6',
    },
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      
      {/* <ThemeProvider theme={styles}>
        <SignIn />
      </ThemeProvider> */}

    </>
  )
}

export default App

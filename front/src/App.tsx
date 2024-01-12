import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material';
import SignIn from './pages/sign-in/SignIn.tsx'
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
      <ThemeProvider theme={styles}>
        <SignIn />
      </ThemeProvider>

    </>
  )
}

export default App

import './App.css'
import { CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import baseTheme from './theme.ts';



function App() {
  return (
    
    <>
    <CssBaseline />
    <ThemeProvider theme={baseTheme}>
      <Outlet />
    </ThemeProvider>
    </>
  )
}

export default App

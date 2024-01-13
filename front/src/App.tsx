import './App.css'
import { CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import baseTheme from './theme.ts';
import SearchAppBar from './layout/Appbar/Appbar.tsx'
import PublicLayout from './layout/PublicLayout.tsx';


export default function App() {
  return (    
    <>
    <PublicLayout />
    <SearchAppBar />

    <CssBaseline />

    <ThemeProvider theme={baseTheme}>
      <Outlet />
    </ThemeProvider>
    </>
  )
}


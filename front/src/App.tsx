import './App.css'
import { CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import baseTheme from './theme.ts';
import SearchAppBar from './layout/Appbar/Appbar.tsx'
import PublicLayout from './layout/PublicLayout.tsx';
import AuthContext from './auth/AuthContext.tsx';
import { createContext, useEffect, useState } from 'react';
import apiClient from './services/api-client.ts';
import { IUser } from './services/user-service.ts';

export default function App() {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  useEffect(() => {
    console.log('Updated default token');
    apiClient.defaults.headers.common = {'authorization': `bearer ${(currentUser as IUser).accessToken}`};
  }, [currentUser]);

  return (    
    <>
    <ThemeProvider theme={baseTheme}>
    <AuthContext.Provider value={{user: currentUser, setUser: setCurrentUser}}>
      <PublicLayout />
      </AuthContext.Provider>
      
      <CssBaseline />

      <Outlet />
    </ThemeProvider>
    </>
  )
}


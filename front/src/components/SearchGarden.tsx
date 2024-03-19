import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import theme from '../theme';
import { useLocation } from "react-router-dom";
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { IUser, getAllUsers } from '../services/user-service';
import { useNavigate } from 'react-router-dom';

const SearchGarden = () => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const [usernames, setUserNames] = useState<String[]>([]);

  useEffect(() => {
    const { req, abort } = getAllUsers();
    req.then((res) => {
        setUserNames((res.data).map(u=>u.username!));
        console.log(usernames)
    }).catch((err) => {
        console.log(err);
    })
    return () => {
        abort();
    }
  }, []);

  let navigate = useNavigate(); 
  const routeUserGarden = (username: string) => routeChange(`/gardenPage?username=${username}`);

  const routeChange = (path: string) => navigate(path);

  const handleOptionSelected = (event, value) => {
    if(value) {
      routeUserGarden(value);
    }
  };
  
  return (
    // <Search>
    //   <SearchIconWrapper>
    //     <SearchIcon />
    //   </SearchIconWrapper>
    //   <StyledInputBase
    //     placeholder="Search gardens..."
    //     inputProps={{ 'aria-label': 'Search' }}
    //   />
    // </Search>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={usernames}
      sx={{ width: 300 }}
      onChange={handleOptionSelected}
      renderInput={(params) => <TextField {...params} label="Search gardens..." />}
    />
  );
};

export default SearchGarden;

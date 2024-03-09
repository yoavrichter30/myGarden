import * as React from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import SearchIcon from '@mui/icons-material/Search';
import baseTheme from '../../theme.ts'
import { Button, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import SearchGarden from '../../components/SearchGarden.tsx';

const theme = createTheme({
  ...baseTheme,

});

export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const Signout = () => {
    handleMenuClose();
    routeSignin();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={Signout}>Signout</MenuItem>
    </Menu>
  );

  let navigate = useNavigate(); 
  const routeGarden = () => routeChange('/gardenPage');
  const routeExplore = () => routeChange('/explorePage');
  const routeSignin = () => routeChange('/Signin');
  const routeProfile = () => routeChange('/gardenPage');

  const routeChange = (path: string) => navigate(path);

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="garden">
        <Toolbar>
        <GrassOutlinedIcon sx={{ fontSize: '3vw' }} />
        <Button onClick={routeGarden}
              color="inherit"
            >
               MyGarden
            </Button>
            <Button onClick={routeExplore}
              color="inherit"
            >
              <SearchIcon />
              Explore
            </Button>
          <Typography
          // TODO: add routing to my garden with the current login user
            onClick={routeGarden}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            
          </Typography>
          <SearchGarden/>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
    </ThemeProvider>
  );
}

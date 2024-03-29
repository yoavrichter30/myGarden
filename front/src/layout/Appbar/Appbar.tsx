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
import AuthContext from '../../auth/AuthContext.tsx';
import { useContext } from 'react';

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

const theme = createTheme({
  ...baseTheme,

});

export default function SearchAppBar() {
  const {user, setUser} = useContext(AuthContext);
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Signout = () => {
    handleMenuClose();

    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser({});
    routeSignin();
  }

  const menuId = 'primary-search-account-menu';

  let navigate = useNavigate(); 
  const routeGarden = () => routeChange(`/gardenPage?username=${localStorage.getItem('userName')}`);
  const routeExplore = () => routeChange('/explorePage');
  const routeSignin = () => routeChange('/signIn');
  const routeProfile = () => routeChange('/editProfile');

  const routeChange = (path: string) => navigate(path);

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
      <MenuItem onClick={routeProfile}>Profile</MenuItem>
      <MenuItem onClick={Signout}>Signout</MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
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

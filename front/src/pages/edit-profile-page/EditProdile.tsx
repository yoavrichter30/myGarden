import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import { Avatar, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import "./EditProdile.css"
import Box from '@mui/material/Box';
import { IUser, getUserById, updateById } from '../../services/user-service.ts';
import { register } from '../../services/user-service.ts';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay-ts';


const SignUpTheme = createTheme({
  ...baseTheme,
});

const getInitials = (first: string, last: string) => `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;

async function getUser(): Promise<IUser> {
  const response = await getUserById(localStorage.getItem('userId'));
  return response;
}

export default function EditProdile() {
  let navigate = useNavigate();

  useEffect(() => {
    getUser().then((user: IUser) => {
      setUserId(user._id);
      setFirstNameInput(user.firstName);
      setLastNameInput(user.lastName);
      setUsernameInput(user.username);
      setEmailInput(user.email);
      setPasswordInput(user.password);
      setIsGoogle(user.isGoogleUser);
    });
  }, []);

  const [editMode, setEditMode] = useState(false);
  
  const [userId, setUserId] = useState('');
  const [startedRegister, setStartedRegister] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isGoogle, setIsGoogle] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);

  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setFirstNameInput(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setLastNameInput(event.target.value);
  };

  const handleUsernamechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setUsernameInput(event.target.value);
  };

  const handleEmailchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setEmailInput(event.target.value);
  };

  const handlePasswordchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setPasswordInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editMode) {
      setIsLoadingActive(true);
      const data = new FormData(event.currentTarget);
        if((isGoogle && data.get('username') && data.get('firstname') && data.get('lastname')) ||
            (!isGoogle && data.get('username') && data.get('firstname') && data.get('lastname') && data.get('email') && data.get('password'))){
          const changedUser: IUser = {
            ...(!isGoogle && {email: data.get('email')?.toString()}),
            ...(!isGoogle && {password: data.get('password')?.toString()}),
            username: data.get('username')?.toString(),
            firstName: data.get('firstname')?.toString(),
            lastName: data.get('lastname')?.toString()
          };
          updateById(userId, changedUser).then(() => {
            setEditMode(false);
          }).finally(() => {
            setIsLoadingActive(false);
          });
        }
    } else {
      handleEdit();
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <div className="signupcard">
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
      <LoadingOverlay
        active={isLoadingActive}
        spinner
        text='Signing up...'
        > 
        <Card className='mainCard' variant="outlined">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar>{getInitials(firstNameInput, lastNameInput)}</Avatar>
            <Typography component="h1" variant="h5">
            Gardner Card
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}> 
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!editMode}
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    color="secondary"
                    id="firstname"
                    value={firstNameInput}
                    autoFocus
                    onChange={handleFirstNameChange}
                    error={startedRegister && firstNameInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={!editMode}
                    required
                    fullWidth
                    color="secondary"
                    id="lastname"
                    name="lastname"
                    value={lastNameInput}
                    autoComplete="family-name"
                    onChange={handleLastNameChange}
                    error={startedRegister && lastNameInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={!editMode}
                    required
                    fullWidth
                    color="secondary"
                    id="username"
                    name="username"
                    autoComplete="family-name"
                    value={usernameInput}
                    onChange={handleUsernamechange}
                    error={startedRegister && usernameInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12}>
                { isGoogle ? <></> :
                  <TextField
                    disabled={!editMode}
                    required
                    fullWidth
                    color="secondary"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={emailInput}
                    onChange={handleEmailchange}
                    error={startedRegister && emailInput.length < 3}
                  />
                }
                </Grid>
                <Grid item xs={12} sm={6}>
                  { isGoogle ? <></> :
                  <TextField
                    disabled={!editMode}
                    required
                    fullWidth
                    color="secondary"
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={passwordInput}
                    onChange={handlePasswordchange}
                    error={startedRegister && passwordInput.length < 3}
                  />
                }
                </Grid>
              </Grid>
              { editMode ? <Button
                color="primary"
                className='signupBtn'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
                : <Button
                color="primary"
                className='signupBtn'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
              }
              { false ? <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link className='signupRedirectionLink' href="/SignIn" variant="body2" underline="hover">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> : <></>
              }
            </Box>
          </Box>
        </Container>
        </Card>
        </LoadingOverlay>
      </Grid>
      </div>
    </ThemeProvider>
  );
}
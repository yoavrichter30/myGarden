import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import baseTheme from '../../theme.ts';
import { Avatar, Card } from '@mui/material';
import { SetStateAction, useState } from 'react';
import "./SignUp.css"
import Box from '@mui/material/Box';

const SignUpTheme = createTheme({
  ...baseTheme,
});

const getInitials = (first: string, last: string) => `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;

export default function SignUp() {
  
  const [startedRegister, setStartedRegister] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');


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

  const handleConfirmPasswordchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setConfirmPasswordInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={SignUpTheme}>
      <div className="signupcard">
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
        
        <Card style={{ backgroundColor: baseTheme.palette.garden.main }}>
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
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}> 
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    color="secondary"
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={handleFirstNameChange}
                    error={startedRegister && firstNameInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={handleLastNameChange}
                    error={startedRegister && lastNameInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    id="username"
                    label="User Name"
                    name="username"
                    autoComplete="family-name"
                    onChange={handleUsernamechange}
                    error={startedRegister && usernameInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailchange}
                    error={startedRegister && emailInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePasswordchange}
                    error={startedRegister && passwordInput.length < 3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    color="secondary"
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    onChange={handleConfirmPasswordchange}
                    error={ passwordInput !== confirmPasswordInput || confirmPasswordInput.length < 3}
                  />
                </Grid>
              </Grid>
              <Button
                color="success"
                className='signupBtn'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link className='signupRedirectionLink' href="/SignIn" variant="body2" underline="hover">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        </Card>
      </Grid>
      </div>
    </ThemeProvider>
  );
}
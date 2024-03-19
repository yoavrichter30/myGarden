import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import GrassOutlinedIcon from '@mui/icons-material/GrassOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./SignIn.css"
import baseTheme from '../../theme.ts';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import { IUser, login } from '../../services/user-service.ts';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../auth/AuthContext.tsx';
import apiClient from '../../services/api-client.ts';
import GoogleIcon from "@mui/icons-material/Google";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";

const SignInTheme = createTheme({
  ...baseTheme,
});

export default function SignIn() {
  let navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [startedRegister, setStartedRegister] = useState(false);

  const handleEmailchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setEmailInput(event.target.value);
  };

  const handlePasswordchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartedRegister(true);
    setPasswordInput(event.target.value);
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeRes: CodeResponse) => {
      const { data } = await apiClient.post("/auth/google", codeRes);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUser(JSON.stringify({...data}));
      navigate('/explorePage');
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') && data.get('password') ){
      const user: IUser = {
        email: data.get('email')?.toString(),
        password: data.get('password')?.toString()
      };
      const res = await login(user);
      localStorage.setItem('userId', res.id);
      localStorage.setItem('userName', res.username);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      setUser(JSON.stringify({...res}));
      console.log('Updated default token');
      navigate('/explorePage');
    }
  };

  return (
    <ThemeProvider theme={SignInTheme}>
            <div  className="signincard">
      <Grid container alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
       
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
          <GrassOutlinedIcon color="primary" sx={{ fontSize: '7vw' }} />
          <Typography component="h1" variant="h5">
            MyGarden
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailchange}
              error={startedRegister && emailInput.length < 3}
            />
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordchange}
              error={startedRegister && passwordInput.length < 3}
            />
            <Button
              color="primary"
              className='mainBtn'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
            onClick={handleGoogleLogin}
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignUp" variant="body2" underline="hover" className='signinRedirectionLink'>
                  "Don't have an account? Sign Up"
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
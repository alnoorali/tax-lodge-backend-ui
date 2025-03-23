import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from "../redux/authSlice";
import logo from '../assets/img/logo.png';
import '../assets/css/Login.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  border: 'none',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    background: "#f8f7fa"
  },
}));

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userData) {
        navigate('/dashboard');
      } else {
        setIsCheckingAuth(false); 
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [userData, navigate]);

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      var response = await dispatch(loginUserAsync(credentials));
      console.log("login response :", response);
    }
  };

  if (isCheckingAuth) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
          backgroundColor: '#f8f7fa', // Match your background color
        }}
      >
        <CircularProgress size={60} /> {/* MUI Circular Progress Loader */}
      </Box>
    );
  }

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <div className="top">
          <div className="logo">
            <img src={logo} alt="Tax Lodge Online Logo" />
          </div>
          <h3>Welcome to Tax Lodge Online</h3>
        </div>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              size='small'
              label="Email"
              variant="filled"
              color={emailError ? 'error' : 'primary'}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              size='small'
              label="Password"
              variant="filled"
              color={passwordError ? 'error' : 'primary'}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="btn-orange"
          >
            Sign in
          </Button>
          {/* Display error message if error exists */}
          {error && (
            <p style={{ color: 'red', marginBottom: 0, textAlign: 'center' }}>
              {error.message} {/* Display the error message from the payload */}
            </p>
          )}
        </Box>
      </Card>
    </SignInContainer>
  );
}
'use client'

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import axios from 'axios';
import { User, useUserContext } from '../context/UserContext';
import FormFeedback from './FormFeedback';

// based on https://github.com/mui/material-ui/blob/v5.14.10/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
export default function LoginForm({handleClose}: {handleClose?: () => void}) {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const { handleUpdateUser, isLoggedIn } = useUserContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/api/users/login`, { email, password });
      const loggedInUser: User = {...response.data.data};

      console.log(loggedInUser)
      handleUpdateUser(loggedInUser)
      setErrMsg(response.data.result)

      if (handleClose) handleClose();

    } catch (err) {
        let message = 'Unknown Error'
        if (err instanceof Error) message = err.message; // only access the .message property if this is definitely an Error   
        console.log(err)
        setErrMsg(message)
    } 
  };

  return (
      <Container maxWidth="md">
        <FormFeedback message={errMsg} isError={!isLoggedIn} onClose={() => setErrMsg('')}/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          { (!isLoggedIn) &&
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center' }}>
              <TextField margin="normal" required fullWidth autoFocus
                id="email" type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <TextField margin="normal" required fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: {xs:'100%', md:'50%'} }}
              >
                Sign In
              </Button>
              
              <Grid container sx={{textAlign: 'left'}}>
                <Grid item xs={6}>
                  <Link href="/forgotpw" variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item xs={6}>
                  <Link href="/connect" variant="body2">Don&apos;t have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
            }
        </Box>
      </Container>
  );
}
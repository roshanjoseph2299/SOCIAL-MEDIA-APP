import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../slices/authSlices';
import {setLogin} from "state"
import { AppBar, Toolbar} from '@mui/material';



const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate()
  const dispatch = useDispatch();

 
  const handleLogin = async (e) => {

    
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('http://localhost:3001/admin/adminlogin', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      });
      
      if (response.ok) {
        const adminDetails = await response.json();

        // Dispatch the action to save admin information in Redux store
        dispatch(setAdminCredentials(adminDetails));

        // Redirect to the admin home page
        nav('/adminhome');
      } else {
        // Authentication failed, handle the error here
        console.error('Authentication failed');
      }
    } catch (error) {
      // Handle network errors or other errors here
      console.error('Error:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" style={{ flexGrow: 1 }}>
            𝓈𝒽𝓊𝓉𝓉𝑒𝓇𝓁𝓎
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh', // Ensure the container takes up the full viewport height
        }}
      >
        <Container maxWidth="xs">
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center">
              Admin Login
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default AdminLogin;

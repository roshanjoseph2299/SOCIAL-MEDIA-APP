import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; // Import the hooks
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlices';


const Navbar = () => {


  const dispatch = useDispatch();
  const nav=useNavigate();

    const handleLogout = () => {
            // Dispatch the logout action to clear adminInfo from Redux state
    dispatch(logout());

      // Remove the adminToken from local storage
     localStorage.removeItem('adminInfo');
      nav('/admin')
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2" style={{ flexGrow: 1 }}>
          𝓈𝒽𝓊𝓉𝓉𝑒𝓇𝓁𝓎
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

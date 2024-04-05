import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetDetailsQuery } from '../app/services/auth/authService';
import { logout, setCredentials } from '../features/auth/authSlice';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import '../styles/header.css';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          {isFetching
            ? 'Fetching your profile...'
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
        </Typography>
        <div className='cta'>
          {userInfo ? (
            <Button variant="contained" color="secondary" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          ) : (
            <Button variant="contained" color="primary" component={NavLink} to='/login'>
              Login
            </Button>
          )}
        </div>
      </Toolbar>
      <Toolbar>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        {/* Add more NavLink components as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

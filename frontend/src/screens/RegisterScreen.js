import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { registerUser } from '../features/auth/authActions';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
} from '@mui/material';

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null);

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile');
    // Redirect user to login page if registration was successful
    if (success) navigate('/login');
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch');
      return;
    }
    // Transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="First Name"
                {...register('firstName', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
                type="email"
                {...register('email', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Password"
                type="password"
                {...register('password', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', { required: true })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Sign Up'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default RegisterScreen;

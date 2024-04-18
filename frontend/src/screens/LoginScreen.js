import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate,Link } from 'react-router-dom';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { userLogin } from '../features/auth/authActions';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid
} from '@mui/material';

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile');
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ marginTop: '20px' }}
          >
            {loading ? <Spinner /> : 'Sign In'}
          </Button>
        </form>
        <Typography style={{ marginTop: '20px' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginScreen;

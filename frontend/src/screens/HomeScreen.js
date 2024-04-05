// App.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeople, fetchFilms, fetchStarships } from '../features/starApiSlice/starApiSlice';
import { Grid, Typography, CircularProgress } from '@mui/material';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { people, films, starships, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchPeople());
    dispatch(fetchFilms());
    dispatch(fetchStarships());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h2" align="center">Star Wars Categories</Typography>
      {loading && <CircularProgress />}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {people.map((person) => (
          <Grid item key={person.name} xs={12} sm={6} md={4} lg={3}>
            {/* Render a Material-UI Card component for each person */}
          </Grid>
        ))}
        {films.map((film) => (
          <Grid item key={film.title} xs={12} sm={6} md={4} lg={3}>
            {/* Render a Material-UI Card component for each film */}
          </Grid>
        ))}
        {starships.map((starship) => (
          <Grid item key={starship.name} xs={12} sm={6} md={4} lg={3}>
            {/* Render a Material-UI Card component for each starship */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeScreen;

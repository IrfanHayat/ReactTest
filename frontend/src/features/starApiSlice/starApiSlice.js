// categoriesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPeople = createAsyncThunk('categories/fetchPeople', async () => {
  const response = await axios.get('/api/people');
  return response.data.results;
});

export const fetchFilms = createAsyncThunk('categories/fetchFilms', async () => {
  const response = await axios.get('/api/films');
  return response.data.results;
});

export const fetchStarships = createAsyncThunk('categories/fetchStarships', async () => {
  const response = await axios.get('/api/starships');
  return response.data.results;
});

const initialState = {
  people: [],
  films: [],
  starships: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.loading = false;
        state.people = action.payload;
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStarships.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.loading = false;
        state.starships = action.payload;
      })
      .addCase(fetchStarships.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;

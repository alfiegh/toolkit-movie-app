import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  movieList: [],
  isLoading: false,
  errors: undefined,
  status: undefined,
  movie: undefined,
  currentPage: 1,
  numOfPages: 0,
  singleMovie: {},
};

const MOVIE_DB_API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const COURSE_API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${MOVIE_DB_API_KEY}&page=`;

export const getMovies = createAsyncThunk('movies/getMovies', async (page) => {
  return fetch(COURSE_API_URL.concat(page))
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
});

export const getSingleMovie = createAsyncThunk(
  'movies/getSingleMovie',
  async (id) => {
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${MOVIE_DB_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.movieList = action.payload.results;
      state.currentPage = action.payload.page;
      state.numOfPages = action.payload.total_pages;
    },
    [getMovies.rejected]: (state) => {
      state.isLoading = false;
      state.errors = true;
    },
    [getSingleMovie.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleMovie.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singleMovie = action.payload;
    },
  },
});

export default movieSlice.reducer;

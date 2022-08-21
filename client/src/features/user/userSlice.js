import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isLoggedIn: false,
  isError: false,
  errorMessage: '',
  isLoading: false,
  //favs
  favoritesList: [],

  //watchlist
  watchlist: [],
};

//auth
const SIGNUP_API = 'http://localhost:8000/accounts/register';
const LOGIN_API = 'http://localhost:8000/accounts/login';
const LOGOUT_API = 'http://localhost:8000/accounts/logout';
const PERSIST_LOGIN_URL = 'http://localhost:8000/accounts/user/';
const VERIFY_TOKEN_URI = 'http://localhost:8000/accounts/authenticated/';
//favs
const GET_USER_FAV = 'http://localhost:8000/accounts/user-favorites';
const ADD_TO_USER_FAV = 'http://localhost:8000/accounts/add-fav-movie/';
const REMOVE_FROM_USER_FAV = 'http://localhost:8000/accounts/remove-fav-movie/';
//watchlist
const GET_USER_WATCHLIST_URL =
  'http://localhost:8000/accounts/get-user-watchlist/';
const ADD_TO_USER_WATCHLIST =
  'http://localhost:8000/accounts/add-to-watchlist/';
const REMOVE_USER_WATCHLIST =
  'http://localhost:8000/accounts/remove-watchlist/';

export const handleRegisterUser = createAsyncThunk(
  'user/handleRegisterUser',
  async (data) => {
    try {
      const newUser = await axios.post(SIGNUP_API, data.userForm);
      const token = document.cookie.split('token=').join('');
      data.navigate('/');
      return { newUser, token };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const handleLoginUser = createAsyncThunk(
  'user/handleLoginUser',
  async (incomingData) => {
    try {
      const user = await axios.post(LOGIN_API, incomingData.loginForm);
      const token = document.cookie.split('token=').join('');
      incomingData.navigate('/');
      //user.data is where the user object is located.
      return { user, token };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handlePersistLogin = createAsyncThunk(
  'user/handlePersistLogin',
  async (id) => {
    try {
      const user = await axios.get(PERSIST_LOGIN_URL + id);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleLogoutUser = createAsyncThunk(
  'user/handleLogoutUser',
  () => {
    try {
      axios.get(LOGOUT_API);
      return;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleVerifyToken = createAsyncThunk(
  'user/handleVerifyToken',
  () => {
    try {
      const res = axios.get(VERIFY_TOKEN_URI);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleGetFav = createAsyncThunk(
  'user/handleGetFav',
  async (page) => {
    try {
      const response = await axios.get(GET_USER_FAV);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleAddToFav = createAsyncThunk(
  'user/handleAddtoFav',
  async (movie) => {
    try {
      const newFavMovie = await axios.post(ADD_TO_USER_FAV, movie);
      return newFavMovie;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleRemoveFav = createAsyncThunk(
  'user/handleRemoveFav',
  async (movie) => {
    try {
      const removeFavMovie = await axios.put(REMOVE_FROM_USER_FAV, movie);
      return removeFavMovie;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleAddToWatch = createAsyncThunk(
  'user/handleAddtoWatch',
  async (movie) => {
    try {
      const newWatchMovie = await axios.post(ADD_TO_USER_WATCHLIST, movie);
      return newWatchMovie;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const handleRemWatchlist = createAsyncThunk(
  'user/handleRemWatchlist',
  async (movie) => {
    try {
      const removeWatchMovie = await axios.put(REMOVE_USER_WATCHLIST, movie);
      return removeWatchMovie;
    } catch (err) {
      console.log(err);
    }
  }
);

export const handleGetWatchlist = createAsyncThunk(
  'user/handleGetWatchlist',
  async () => {
    try {
      const response = await axios.get(GET_USER_WATCHLIST_URL);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [handleRegisterUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoggedIn = false;
    },
    [handleRegisterUser.fulfilled]: (state, action) => {
      const newUser = JSON.parse(action.payload.newUser.config.data);
      state.user = newUser.username;
      state.isLoggedIn = true;
    },
    [handleRegisterUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.response.data.errorMessage;
    },
    [handleLoginUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoggedIn = false;
    },
    [handleLoginUser.fulfilled]: (state, action) => {
      // action.payload.user.data to get the user object completely.
      state.user = action.payload.user.data;
      state.isLoggedIn = true;
    },
    [handleLoginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.response.data.errorMessage;
    },
    [handlePersistLogin.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoggedIn = false;
    },
    [handlePersistLogin.fulfilled]: (state, action) => {
      state.user = action.payload.data;
      state.isLoggedIn = true;
    },
    [handlePersistLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.response.data.errorMessage;
    },
    [handleLogoutUser.pending]: (state) => {
      state.isError = false;
      state.isLoggedIn = false;
    },
    [handleLogoutUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.authenticationToken = '';
      state.isLoggedIn = false;
    },
    [handleVerifyToken.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isLoggedIn = false;
    },
    [handleVerifyToken.fulfilled]: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    [handleVerifyToken.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    [handleGetFav.pending]: (state) => {
      state.isLoading = true;
    },
    [handleGetFav.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favoritesList = action.payload;
    },
    [handleGetFav.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.error;
    },
    [handleGetWatchlist.pending]: (state) => {
      state.isLoading = true;
    },
    [handleGetWatchlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.watchlist = action.payload;
    },
    [handleGetWatchlist.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.error;
    },
    [handleAddToFav.pending]: (state) => {
      state.isLoading = true;
    },
    [handleAddToFav.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.favoritesList = [
        ...state.favoritesList,
        action.payload.data.favoritesList,
      ];
    },
    [handleAddToFav.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.paylod.error;
    },
    [handleRemoveFav.pending]: (state) => {
      state.isLoading = true;
    },
    [handleRemoveFav.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.favoritesList = action.payload.data.favoritesList;
    },
    [handleRemoveFav.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.error;
    },
    [handleAddToWatch.pending]: (state) => {
      state.isLoading = true;
    },
    [handleAddToWatch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.watchlist = [...state.watchlist, action.payload.data.watchlist];
    },
    [handleAddToWatch.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.error;
    },
    [handleRemWatchlist.pending]: (state) => {
      state.isLoading = true;
    },
    [handleRemWatchlist.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.watchlist = action.payload.data.watchlist;
    },
    [handleRemWatchlist.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload.error;
    },
  },
});

export default userSlice.reducer;

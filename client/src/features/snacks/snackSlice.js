import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  snackList: [],
  isLoading: false,
  errors: undefined,
  status: undefined,
  snack: undefined,
};

const ADD_SNACK_URL = 'http://localhost:8000/snacklist/add';
const FETCH_SNACKS_URL = 'http://localhost:8000/snacklist/snacks';
const DELETE_API_URL = 'http://localhost:8000/snacklist/snack/';

export const handleSnackFetch = createAsyncThunk(
  'snacks/handleSnackFetch',
  async () => {
    try {
      const res = await axios.get(FETCH_SNACKS_URL);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const createSnackRequest = createAsyncThunk(
  'snacks/createSnackRequest',
  async (snackData) => {
    try {
      const res = await axios.post(ADD_SNACK_URL, snackData);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const deleteSnackRequest = createAsyncThunk(
  'snacks/deleteSnackRequest',
  (id) => {
    try {
      const res = axios.delete(DELETE_API_URL + id);
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

const snackSlice = createSlice({
  name: 'snacks',
  initialState,
  reducers: {},
  extraReducers: {
    [handleSnackFetch.pending]: (state) => {
      state.isLoading = true;
    },
    [handleSnackFetch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.snackList = action.payload.data;
    },
    [handleSnackFetch.rejected]: (state, action) => {
      state.errors = action.payload.error;
    },
    [createSnackRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [createSnackRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.snackList = [...state.snackList, action.payload];
    },
    [createSnackRequest.rejected]: (state, action) => {
      state.errors = action.payload.error;
    },
    [deleteSnackRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteSnackRequest.fulfilled]: (state, action) => {
      const newState = state.snackList.filter(
        (snack) => snack._id !== action.payload.data._id
      );
      state.isLoading = false;
      state.snackList = newState;
    },
    [deleteSnackRequest.rejected]: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export default snackSlice.reducer;

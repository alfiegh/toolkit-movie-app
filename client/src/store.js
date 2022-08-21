import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './features/movies/movieSlice';
import snackSlice from './features/snacks/snackSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    user: userSlice,
    snacks: snackSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

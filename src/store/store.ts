import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import countriesReducer from './countriesSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

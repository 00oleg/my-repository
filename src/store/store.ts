import { configureStore } from '@reduxjs/toolkit';
import { itemReducer } from './itemReducer';
import itemApi from '../services/api';

export const store = configureStore({
  reducer: {
    items: itemReducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

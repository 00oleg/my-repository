import { configureStore } from '@reduxjs/toolkit';
import { itemReducer } from './itemReducer';
import itemApi from '../services/api';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      items: itemReducer,
      [itemApi.reducerPath]: itemApi.reducer,
    },
    middleware: (gDM) => gDM().concat([itemApi.middleware]),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);

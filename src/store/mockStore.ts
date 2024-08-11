import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  items: 0,
};

const mockSlice = createSlice({
  name: 'mock',
  initialState,
  reducers: {
    increment: (state) => {
      state.items += 1;
    },
    decrement: (state) => {
      state.items -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.items = action.payload;
    },
  },
});

const mockStore = configureStore({
  reducer: mockSlice.reducer,
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;

export { mockStore };

interface AppState {
  items: {
    values: Array<{ uid: string; name: string; earthAnimal: boolean }>;
  };
}

const mockReducer = (
  state: AppState = { items: { values: [] } },
  action: AnyAction,
) => {
  switch (action.type) {
    case 'items/removeAll':
      return { ...state, items: { values: [] } };
    default:
      return state;
  }
};

type MockStore = Store<AppState>;

export const createMockStore = (initialState: AppState): MockStore => {
  return configureStore({
    reducer: mockReducer,
    preloadedState: initialState,
  }) as MockStore;
};

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: { values: Record<string, object> } = {
  values: {},
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<object>) => {
      const el = action.payload;
      state.values = { ...el };
    },
    removeItems: (state) => {
      state.values = {};
    },
  },
});

export const { toggleItem, removeItems } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;

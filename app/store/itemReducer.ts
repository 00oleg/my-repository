import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SearchResultItem } from '../types/SearchTypes';

const initialState: { values: Record<string, SearchResultItem> } = {
  values: {},
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<SearchResultItem>) => {
      const el = action.payload;

      if (state.values[el.uid]) {
        delete state.values[el.uid];
      } else {
        state.values[el.uid] = { ...el };
      }
    },
    removeItems: (state) => {
      state.values = {};
    },
  },
});

export const { toggleItem, removeItems } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;

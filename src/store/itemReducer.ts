import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ItemState {
  values: string[];
}

const initialState: ItemState = {
  values: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<string>) => {
      const el = action.payload;

      if (state.values.includes(el)) {
        const index = state.values.indexOf(el);
        state.values.splice(index, 1);
      } else {
        state.values.push(el);
      }
    },
  },
});

export const { toggleItem } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;

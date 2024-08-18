import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

const initialState: { users: User[] } = {
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    clearLast: (state) => {
      state.users = state.users.map((el: User) => ({ ...el, isLast: false }));
    },
  },
});

export const { addUser, clearLast } = userSlice.actions;
export default userSlice.reducer;

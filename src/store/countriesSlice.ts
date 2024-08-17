import { createSlice } from '@reduxjs/toolkit';
import countriesAll from '../utils/countriesAll';

const initialState = {
  list: [...countriesAll],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;

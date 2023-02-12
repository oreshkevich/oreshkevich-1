/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loadingCategories: true,
  categories: [],
  error: null,
  statusCategories: null,
};

export const getCategories = createAsyncThunk('categories/getCategories', async (id, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.get('https://strapi.cleverland.by/api/categories');

    if (!res.statusText === 'OK') {
      rejectWithValue(res.data.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(setCategories(res.data));
  } catch (error) {
    rejectWithValue(error.res.data);
  }
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [getCategories.fulfilled]: (state) => {
      state.loadingCategories = false;
      state.status = 'loading';
    },
    [getCategories.pending]: (state) => {
      state.loadingCategories = true;
      state.status = 'resolved';
    },
    [getCategories.rejected]: (state, action) => {
      state.status = 'rejected';
      state.loadingCategories = false;
      state.error = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;

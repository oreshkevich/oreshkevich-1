/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { httpService } from '../../../api/api';

const initialState = {
  loadingCategories: true,
  categories: [],
  error: null,
  statusCategories: null,
};
const token = localStorage.getItem('token');

// export const getCategories = createAsyncThunk('categories/getCategories', async (id, { rejectWithValue, dispatch }) => {
//   try {
//     const response = await fetch('https://strapi.cleverland.by/api/categories', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.statusText !== 'OK') {
//       throw new Error('Server Error!');
//     }

//     const data = await response.json();

//     return dispatch(setCategories(data));
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.error = false;
      state.categories = action.payload;
      state.loadingCategories = false;
    },
    setError(state) {
      state.error = true;
      state.loadingCategories = false;
    },
  },
  //   extraReducers: {
  //     [getCategories.fulfilled]: (state) => {
  //       state.loadingCategories = false;
  //       state.status = 'loading';
  //     },
  //     [getCategories.pending]: (state) => {
  //       state.loadingCategories = true;
  //       state.status = 'resolved';
  //     },
  //     [getCategories.rejected]: (state, action) => {
  //       state.status = 'rejected';
  //       state.loadingCategories = false;
  //       state.error = action.payload;
  //     },
  //   },
});
export const { setCategories, setError } = categorySlice.actions;

// export const categoriesReducer = categorySlice.reducer;

export const getCategories = () => async (dispatch) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   };
  try {
    const resp = await httpService.get('/categories');

    dispatch(setCategories(resp.data));
  } catch (err) {
    dispatch(setError(err.data));
  }

  //   await axios
  //     .get('https://strapi.cleverland.by/api/categories', config)
  //     .then((response) => dispatch(setCategories(response.data)))
  //     .catch((error) => dispatch(setError(error.data)));
};

// export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;

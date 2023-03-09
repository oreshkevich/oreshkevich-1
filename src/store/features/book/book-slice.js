/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { httpService } from '../../../api/api';

const initialState = {
  loadingBook: true,
  books: [],
  error: null,
  status: null,
};

const token = localStorage.getItem('token');

// export const getSearchId = createAsyncThunk('books/getSearchId', async (id, { rejectWithValue, dispatch }) => {
//   try {
//     const response = await fetch(`https://strapi.cleverland.by/api/books/${id}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.statusText !== 'OK') {
//       throw new Error('Server Error!');
//     }

//     const data = await response.json();

//     return dispatch(setBooks(data));
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.error = false;
      state.books = action.payload;
      state.loadingBook = false;
    },
    setBookError(state) {
      state.error = true;
      state.loadingBook = false;
    },
  },
  //   extraReducers: {
  //     [getSearchId.fulfilled]: (state) => {
  //       state.loadingBook = false;
  //       state.status = 'loading';
  //     },
  //     [getSearchId.pending]: (state) => {
  //       state.loadingBook = true;
  //       state.status = 'resolved';
  //     },
  //     [getSearchId.rejected]: (state, action) => {
  //       state.status = 'rejected';
  //       state.loadingBook = false;
  //       state.error = action.payload;
  //     },
  //   },
});
// export const { setCategories, setError } = categorySlice.actions;
export const { setBooks, setBookError } = bookSlice.actions;

export const getSearchId = (id) => async (dispatch) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   };
  try {
    const resp = await httpService.get(`books/${id}`);

    console.log(resp);
    dispatch(setBooks(resp.data));
  } catch (err) {
    dispatch(setBookError(err.data));
  }

  // await axios
  //   .get(`https://strapi.cleverland.by/api/books/${id}`, config)
  //   .then((response) => dispatch(setBooks(response.data)))
  //   .catch((error) => dispatch(setBookError(error.data)));
};

// export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;

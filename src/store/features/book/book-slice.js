/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  loadingBook: true,
  books: [],
  error: null,
  status: null,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.error = false;
      state.books = action.payload;
    },
    setBookError(state) {
      state.error = true;
    },
    showLoading(state) {
      state.loadingBook = true;
    },
    hiddenLoading(state) {
      state.loadingBook = false;
    },
  },
});
export const { setBooks, setBookError, showLoading, hiddenLoading } = bookSlice.actions;

export const getSearchId = (id) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const resp = await httpService.get(`books/${id}`);

    dispatch(setBooks(resp.data));
  } catch (err) {
    dispatch(setBookError(err.data));
  }
  dispatch(hiddenLoading());
};

export default bookSlice.reducer;

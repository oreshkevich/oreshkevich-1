/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loadingBook: true,
  books: [],
  error: null,
  status: null,
};

export const getSearchId = createAsyncThunk('books/getSearchId', async (id, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.get(`https://strapi.cleverland.by/api/books/${id}`);

    if (!res.statusText === 'OK') {
      rejectWithValue(res.data.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(setBooks(res.data));
  } catch (error) {
    rejectWithValue(error.res.data);
  }
});

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: {
    [getSearchId.fulfilled]: (state) => {
      state.loadingBook = false;
      state.status = 'loading';
    },
    [getSearchId.pending]: (state) => {
      state.loadingBook = true;
      state.status = 'resolved';
    },
    [getSearchId.rejected]: (state, action) => {
      state.status = 'rejected';
      state.loadingBook = false;
      state.error = action.payload;
    },
  },
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { httpService } from '../../../api/api';
import { tokenData } from '../authorization/authorization-slice';

const initialState = {
  loading: true,
  posts: [],
  isErrorBook: false,
  stat: null,
  isError: null,
  isLoadingBook: true,
};

const token = localStorage.getItem('token');

// export const getPosts = createAsyncThunk('posts/getPosts', async (_, { rejectWithValue, dispatch }) => {
//   try {
//     const response = await fetch('https://strapi.cleverland.by/api/books', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.statusText !== 'OK') {
//       throw new Error('Server Error!');
//     }

//     const data = await response.json();

//     return dispatch(setPosts(data));
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.isErrorBook = false;
      state.posts = action.payload;
      state.isLoadingBook = false;
    },
    setError(state) {
      state.isErrorBook = true;
      state.isLoadingBook = true;
    },
    // loaderBookTrue(state) {
    //   state.isLoadingBook = true;
    //   state.isErrorBook = false;
    // },
  },
  //   extraReducers: {
  //     [getPosts.fulfilled.type]: (state) => {
  //       state.loading = false;
  //       state.stat = 'loading';
  //     },
  //     [getPosts.pending.type]: (state) => {
  //       state.loading = true;
  //       state.stat = 'resolved';
  //     },
  //     [getPosts.rejected]: (state, action) => {
  //       state.stat = 'rejected';
  //       state.loading = false;
  //       state.error = action.payload;
  //     },
  //   },
});

// export const { setBooks, setBook, loaderBookTrue, loaderBook, setError, setBookError, reverseBooks, ascendingBooks } =
//   postSlice.actions;
export const { setPosts, setError } = postSlice.actions;
export const booksReducer = postSlice.reducer;

export const getPosts = () => async (dispatch) => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token ? localStorage.getItem('token') : tokenData}`,
  //     },
  //   };

  try {
    const resp = await httpService.get('/books');

    dispatch(setPosts(resp.data));
  } catch (err) {
    dispatch(setError(err.data));
  }

  //   await axios
  //     .get('https://strapi.cleverland.by/api/books', config)
  //     .then((response) => dispatch(setPosts(response.data)))
  //     .catch((error) => dispatch(setError(error.data)));
};

export default postSlice.reducer;

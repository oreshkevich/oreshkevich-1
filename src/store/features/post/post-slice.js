/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { httpService } from '../../../api/api';

const initialState = {
  posts: [],
  isErrorBook: null,
  isLoadingBook: true,
};

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
      state.isLoadingBook = false;
    },
    showLoading(state) {
      state.isLoadingBook = true;
    },
    hiddenLoading(state) {
      state.isLoadingBook = false;
    },
  },
});

export const { setPosts, setError, showLoading, hiddenLoading } = postSlice.actions;
export const booksReducer = postSlice.reducer;

export const getPosts = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const resp = await httpService.get('/books');

    dispatch(setPosts(resp.data));
  } catch (err) {
    dispatch(setError(err.data));
  }
  dispatch(hiddenLoading());
};

export default postSlice.reducer;

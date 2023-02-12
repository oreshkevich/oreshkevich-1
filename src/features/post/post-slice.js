/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  posts: [],
  err: null,
  stat: null,
};

export const getPosts = createAsyncThunk('posts/getPosts', async (name, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.get('https://strapi.cleverland.by/api/books');

    if (!res.statusText === 'OK') {
      throw new Error('Server Error!');
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(setPosts(res.data));
  } catch (err) {
    rejectWithValue(err.res.data);
  }
});

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [getPosts.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
    },
    [getPosts.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
    },
    [getPosts.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.err = action.payload;
    },
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;

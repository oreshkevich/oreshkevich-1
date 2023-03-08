/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  passwords: [],
  error: null,
  stat: null,
  statusText: null,
};

export const postPassword = createAsyncThunk(
  'passwords/postPassword',
  async (dataForm, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://strapi.cleverland.by/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });

      if (response.statusText !== 'OK') {
        throw new Error('error');
      }

      const data = await response.json();

      return dispatch(setPassword(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const passwordSlice = createSlice({
  name: 'passwords',
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.passwords = action.payload;
    },
  },
  extraReducers: {
    [postPassword.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
      state.error = null;
      state.statusText = null;
    },
    [postPassword.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
      state.error = null;
      state.statusText = 'OK';
    },
    [postPassword.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.error = action.payload;
      state.statusText = null;
    },
  },
});

export const { setPassword } = passwordSlice.actions;
export default passwordSlice.reducer;

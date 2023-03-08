/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  recoveryPassword: [],
  error: null,
  stat: null,
  statusText: null,
};

export const postRecoveryPassword = createAsyncThunk(
  'recoveryPassword/postRecoveryPassword',
  async (dataForm, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://strapi.cleverland.by/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForm),
      });

      if (response.statusText !== 'OK') {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      //   if (data.jwt) localStorage.setItem('token', data.jwt);

      return dispatch(setRecoveryPassword(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const recoveryPasswordSlice = createSlice({
  name: 'recoveryPassword',
  initialState,
  reducers: {
    setRecoveryPassword: (state, action) => {
      state.recoveryPassword = action.payload;
      localStorage.setItem('token', action.payload.jwt);
    },
  },
  extraReducers: {
    [postRecoveryPassword.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
      state.error = null;
      state.statusText = null;
    },
    [postRecoveryPassword.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
      state.error = null;
      state.statusText = 'OK';
    },
    [postRecoveryPassword.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.error = action.payload;
      state.statusText = null;
    },
  },
});

export const { setRecoveryPassword } = recoveryPasswordSlice.actions;
export default recoveryPasswordSlice.reducer;

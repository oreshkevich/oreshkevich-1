/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  registrations: [],
  error: null,
  stat: null,
  statusText: null,
};

export const addNewRegistration = createAsyncThunk(
  'registrations/addNewRegistration',
  async (dataForm, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://strapi.cleverland.by/api/auth/local/register', {
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

      return dispatch(setRegistration(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    setRegistration: (state, action) => {
      state.registrations = action.payload;
      localStorage.setItem('token', action.payload.jwt);
    },
  },
  extraReducers: {
    [addNewRegistration.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
      state.error = null;
      state.statusText = null;
    },
    [addNewRegistration.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
      state.error = null;
      state.statusText = 'OK';
    },
    [addNewRegistration.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.error = action.payload;
      state.statusText = null;
    },
  },
});

export const { setRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  registrations: [],
  error: null,
  stat: null,
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

      console.log(response.statusText);
      if (response.statusText !== 'OK') {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      console.log(data.jwt);
      if (data.jwt) localStorage.setItem('token', data.jwt);

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
    },
  },
  extraReducers: {
    [addNewRegistration.fulfilled.type]: (state) => {
      state.loading = false;
      state.stat = 'loading';
    },
    [addNewRegistration.pending.type]: (state) => {
      state.loading = true;
      state.stat = 'resolved';
    },
    [addNewRegistration.rejected]: (state, action) => {
      state.stat = 'rejected';
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;

/* eslint-disable import/no-default-export */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  registrations: [],
  error: false,
  errorStatus: false,
  success: false,
};

export const registrationSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    setRegistration: (state, action) => {
      state.registrations = action.payload;
      state.error = false;
      state.errorStatus = false;
      state.success = true;
      state.loading = false;
    },

    setRegistrationError(state, actions) {
      state.error = actions.payload.error;
      state.loading = false;
      state.success = false;
    },
    setError(state) {
      state.errorStatus = 'error';
      state.loading = false;
      state.success = false;
    },
    showLoading(state) {
      state.loading = true;
    },
    hiddenLoading(state) {
      state.loading = false;
    },
  },
});
export const { setRegistration, setRegistrationError, setError, showLoading, hiddenLoading } =
  registrationSlice.actions;

export const addNewRegistration = (data) => async (dispatch) => {
  dispatch(showLoading());

  try {
    await axios.post('https://strapi.cleverland.by/api/auth/local/register', {
      email: data.email,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });
    dispatch(setRegistration());
  } catch (error) {
    dispatch(setRegistrationError(error.response.data));
    dispatch(setError(error));
  }
  dispatch(hiddenLoading());
};

export default registrationSlice.reducer;

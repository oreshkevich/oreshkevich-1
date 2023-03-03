import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { login } from '../../api/api';

// export const submitSignup = createAsyncThunk('/signup', async (formData, thunkAPI) => {
//   try {
//     return await signup(formData);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data);
//   }
// });

export const submitLogin = createAsyncThunk('/signin', async (formData, thunkAPI) => {
  try {
    const { data } = await login(formData);

    return {
      token: data.token,
      login: formData.login,
      password: formData.password,
      id: data.token,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

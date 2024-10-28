
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';


export const registerUser = createAsyncThunk('users/registerStudent', async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data; // Assuming the API returns the user data or success message
});


export const loginUser = createAsyncThunk('users/login', async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data; 
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; 
    },
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

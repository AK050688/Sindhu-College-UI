// slices/admissionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admissions'; // Adjust the base URL as needed

// Async thunk to fetch all admissions
export const fetchAdmissions = createAsyncThunk('admissions/fetchAdmissions', async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

// Async thunk to create a new admission
export const createAdmission = createAsyncThunk('admissions/createAdmission', async (admissionData) => {
  const response = await axios.post(BASE_URL, admissionData);
  return response.data; // Assuming the API returns the created admission data
});

// Async thunk to delete an admission
export const deleteAdmission = createAsyncThunk('admissions/deleteAdmission', async (admissionId) => {
  await axios.delete(`${BASE_URL}/${admissionId}`);
  return admissionId; // Return the ID of the deleted admission
});

// Admission slice
const admissionSlice = createSlice({
  name: 'admissions',
  initialState: {
    admissions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAdmissions: (state) => {
      state.admissions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.admissions = action.payload;
      })
      .addCase(fetchAdmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.admissions.push(action.payload); // Add the new admission to the list
      })
      .addCase(createAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAdmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.admissions = state.admissions.filter((admission) => admission._id !== action.payload);
      })
      .addCase(deleteAdmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addAdmission } = admissionSlice.actions;
export default admissionSlice.reducer; // Make sure to export the re
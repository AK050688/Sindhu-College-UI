// store.js
import { configureStore } from '@reduxjs/toolkit';
import admissionReducer from './features/admissionSlice'; // Ensure the path is correct
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    admissions: admissionReducer, // This should point to a valid reducer function
    users: userReducer,
  },
});

export default store;
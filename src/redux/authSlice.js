import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper function to load user data from localStorage
const loadUserFromLocalStorage = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Async thunk for login API
export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
        if (!error.response) {
          return rejectWithValue({ message: 'Network error or server is not responding' });
        }
        return rejectWithValue(error.response.data);
      }
    }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: loadUserFromLocalStorage(), // Load user data from localStorage
  },
  reducers: {
    loginUser: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Save to localStorage
    },
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem('userData'); // Clear from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload)); // Save to localStorage
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed'; // Handle API errors
      });
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
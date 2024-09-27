import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from './../action'

export const login = createAsyncThunk(
  'login',
  async (userInfo: { username: string; password: string }) => {
    // Replace with your actual API call or authentication logic
    const response = await fetch('/auth', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Login failed'); // Handle errors appropriately
    }

    const data = await response.json();
    // Return the data you need from the API response
    return data.token; // Assuming the API returns an authentication token
  }
);

const initialState = {
	isLoggedIn: false,
	loading: 'idle',
	error: ''
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(LOGIN, (state) => {
			state.isLoggedIn = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoggedIn = true
		})
		builder.addCase(login.rejected, (state, action) => {
			state.isLoggedIn = false
			state.error = 'Username or password is not correct'
		})
	},
})

export const authReducer = authSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from './../action'

const login = createAsyncThunk('login', () => {
	return null
})

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
			console.log('state ', state)
			console.log('action ', action)
			state.isLoggedIn = true
		})
		builder.addCase(login.rejected, (state, action) => {
			console.log('state ', state)
			console.log('action ', action)
			state.isLoggedIn = false
			state.error = 'Username or password is not correct'
		})
	},
})

export const authReducer = authSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGOUT } from './../action'
import { fetchJson } from "../api";
import { BASE_URL } from "../../utils/url";

export const login = createAsyncThunk(
	'login',
	async (userInfo: { email: string; password: string }) => {
		const authInfo = await fetchJson(BASE_URL + '/auth')
		return authInfo
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
		builder.addCase(LOGOUT, (state) => {
			state.isLoggedIn = false
		})
		builder.addCase(login.fulfilled, (state, action: any) => {
			console.log(action);

			const formUserInfo = action.meta.arg
			const authInfo = action.payload

			if (formUserInfo.email === authInfo.email && formUserInfo.password === authInfo.password) {
				state.isLoggedIn = true
			} else {
				state.isLoggedIn = false
				state.error = 'Email or password is not correct'
			}
		})
		builder.addCase(login.rejected, (state) => {
			state.isLoggedIn = false
		})
	},
})

export const authReducer = authSlice.reducer
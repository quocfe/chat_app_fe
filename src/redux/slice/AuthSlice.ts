import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authState {
	loading: boolean;
	user: any;
	error: string | null;
}

const initialState: authState = {
	loading: false,
	user: null,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		startSignUp(state) {
			state.loading = true;
			state.error = null;
		},
		signUpSuccess(state, action: PayloadAction<any>) {
			state.loading = false;
			state.user = action.payload;
			state.error = null;
		},
		signUpFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload;
		},
		startLogin(state) {
			state.loading = true;
			state.error = null;
			console.log('startLogin');
		},
		loginSuccess(state, action: PayloadAction<any>) {
			state.loading = false;
			state.user = action.payload;
			state.error = null;
			console.log('loginSuccess');
		},
		loginFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.user = null;
			state.error = action.payload;
			console.log('loginFailed');
		},
		logOutSuccess(state) {
			state.loading = false;
			state.user = null;
			state.error = null;
		},
	},
});

export const {
	startSignUp,
	signUpSuccess,
	signUpFailed,
	startLogin,
	loginSuccess,
	loginFailed,
	logOutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

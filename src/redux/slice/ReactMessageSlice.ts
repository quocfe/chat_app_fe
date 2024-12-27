import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReactMessageState {
	data: any[]; // Update with the actual type of data
	loading: boolean;
	error: string | null; // Update with the actual type of error
	showbox: boolean;
}

const initialState: ReactMessageState = {
	data: [],
	loading: false,
	error: null,
	showbox: false,
};

const reactMessageSlice = createSlice({
	name: 'reactMessage',
	initialState,
	reducers: {
		setEmojis(state, action: PayloadAction<any[]>) {
			state.loading = false;
			state.data = action.payload;
		},

		stateEmojis(state) {
			state.loading = !state.loading;
		},
	},
});

export const { setEmojis, stateEmojis } = reactMessageSlice.actions;

export default reactMessageSlice.reducer;

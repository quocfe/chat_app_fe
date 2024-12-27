import { createSlice } from '@reduxjs/toolkit';
import { IFMessage } from '../../models/message';

interface initialStateProps {
	showBox: boolean;
	messagesSelect: IFMessage | null;
	messagesReply: [];
}

const initialState: initialStateProps = {
	showBox: false,
	messagesSelect: null,
	messagesReply: [],
};

const ReplyMessageSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		selectMessage: (state, action) => {
			state.showBox = true;
			state.messagesSelect = action.payload;
		},
		unSelectMessage: (state) => {
			state.showBox = false;
			state.messagesSelect = null;
		},
		setReplyMessage: (state, action) => {
			state.messagesReply = action.payload;
		},
	},
});

export const { selectMessage, unSelectMessage, setReplyMessage } =
	ReplyMessageSlice.actions;

export default ReplyMessageSlice.reducer;

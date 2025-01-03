import { createSlice } from '@reduxjs/toolkit';
import { IFUserInSideBar } from '../../models/userInSideBar';

interface conversationState {
	selectedConversation: IFUserInSideBar | null;
	messages: [];
	loading: boolean;
	loadingConversation: boolean;
}

const initialState: conversationState = {
	selectedConversation: null,
	messages: [],
	loading: false,
	loadingConversation: false,
};

const ConversationSlice = createSlice({
	name: 'conversation',
	initialState,
	reducers: {
		setSelectedConversation: (state, action) => {
			state.loadingConversation = true;
			state.selectedConversation = action.payload;
			state.loadingConversation = false;
		},
		setMessages: (state, action) => {
			state.messages = action.payload;
			state.loading = false;
		},
		startSendMessage: (state) => {
			console.log('startSendMessage');
			state.loading = true;
		},
		successSendMessage: (state) => {
			console.log('successSendMessage');
			state.loading = false;
		},
	},
});

export const {
	setSelectedConversation,
	setMessages,
	startSendMessage,
	successSendMessage,
} = ConversationSlice.actions;

export default ConversationSlice.reducer;

import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './slice/AuthSlice';
import ConversationSlice from './slice/ConversationSlice';
import ReplyMessageSlice from './slice/ReplyMessageSlice';
import ReactMessageSlice from './slice/ReactMessageSlice';

export const rootReducer = combineReducers({
	auth: AuthSlice,
	conversation: ConversationSlice,
	replyMessage: ReplyMessageSlice,
	reactMessage: ReactMessageSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

import { useDispatch } from 'react-redux';
import { setReplyMessage } from '../redux/slice/ReplyMessageSlice';
import { replymessageApi } from '../service';
import { setMessages } from '../redux/slice/ConversationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';

const useReplyMessage = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector((state: RootState) => state.conversation);
	const getReplyMessages = async () => {
		try {
			const res = await replymessageApi.getReplyMessagesApi();
			dispatch(setReplyMessage(res));
		} catch (error) {
			console.log('error', error);
		}
	};

	const sendReplyMessage = async (
		messageId: string,
		receiverId: string,
		replyMessage: string
	) => {
		try {
			const res = await replymessageApi.sendReplyMessageApi(
				messageId,
				receiverId,
				replyMessage
			);
			dispatch(setMessages([...messages, res]));
		} catch (error) {
			console.log('error', error);
		}
	};

	return { getReplyMessages, sendReplyMessage };
};

export default useReplyMessage;

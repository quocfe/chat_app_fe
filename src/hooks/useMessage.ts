import { useDispatch } from 'react-redux';
import {
	setMessages,
	startSendMessage,
	successSendMessage,
} from '../redux/slice/ConversationSlice';
import { messageApi } from '../service/message/message';

const useMessage = () => {
	const dispatch = useDispatch();

	// const auth = useSelector((state: RootState) => state.auth.user);
	const getMessage = async (id: string) => {
		try {
			const res = await messageApi.getMessageApi(id);
			dispatch(setMessages(res));
		} catch (error) {
			console.log('error', error);
		}
	};

	const sendMessage = async (id: string, message: string) => {
		try {
			dispatch(startSendMessage());
			await messageApi.sendMessageApi(id, message);
			dispatch(successSendMessage());
		} catch (error) {
			console.log('error', error);
		}
	};

	const unSendMessage = async (messageId: string, statusUnSend: string) => {
		try {
			dispatch(startSendMessage());
			await messageApi.unSendMessageApi(messageId, statusUnSend);
			dispatch(successSendMessage());
		} catch (error) {
			console.log('error', error);
		}
	};

	return { getMessage, sendMessage, unSendMessage };
};

export default useMessage;

import { useDispatch } from 'react-redux';
import { setEmojis, stateEmojis } from '../redux/slice/ReactMessageSlice';
import { reactmessageApi } from '../service';

const useReactMessage = () => {
	const dispatch = useDispatch();
	const getReactMessage = async () => {
		try {
			const res = await reactmessageApi.getEmojisByMessageId();

			dispatch(setEmojis(res));
		} catch (error) {
			console.log('error', error);
		}
	};

	const setReactMessage = async (messageId: string, emoji: string) => {
		try {
			await reactmessageApi.sendReactMessage(messageId, emoji);
			dispatch(stateEmojis());
		} catch (error) {
			console.log('error', error);
		}
	};

	// eslint-disable-next-line @typescript-eslint/ban-types
	const updateReactMessage = async (reactMessageId: string, emoji: {}) => {
		try {
			await reactmessageApi.updateReactMessage(reactMessageId, emoji);
			dispatch(stateEmojis());
		} catch (error) {
			console.log(error);
		}
	};
	const deleteReactMessage = async (reactMessageId: string) => {
		try {
			await reactmessageApi.deleteReactMessage(reactMessageId);
			dispatch(stateEmojis());
		} catch (error) {
			console.log(error);
		}
	};

	return {
		setReactMessage,
		getReactMessage,
		updateReactMessage,
		deleteReactMessage,
	};
};

export default useReactMessage;

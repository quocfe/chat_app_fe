import { useDispatch } from 'react-redux';
import { setEmojis, stateEmojis } from '../redux/slice/ReactMessageSlice';
import { reactmessageApi } from '../service';

const useReactMessage = () => {
	const dispatch = useDispatch();
	const getReactMessage = async () => {
		try {
			const res = await reactmessageApi.getEmojisByMessageId();

			if (res.status === 200) {
				dispatch(setEmojis(res.data));
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const setReactMessage = async (messageId: string, emoji: string) => {
		try {
			const res = await reactmessageApi.sendReactMessage(messageId, emoji);
			if (res.status === 200) {
				dispatch(stateEmojis());
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	// eslint-disable-next-line @typescript-eslint/ban-types
	const updateReactMessage = async (reactMessageId: string, emoji: {}) => {
		try {
			const res = await reactmessageApi.updateReactMessage(
				reactMessageId,
				emoji
			);
			if (res.status === 200) {
				dispatch(stateEmojis());
			}
		} catch (error) {
			console.log(error);
		}
	};
	const deleteReactMessage = async (reactMessageId: string) => {
		try {
			const res = await reactmessageApi.deleteReactMessage(reactMessageId);
			if (res.status === 200) {
				dispatch(stateEmojis());
			}
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

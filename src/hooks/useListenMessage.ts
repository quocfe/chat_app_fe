import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useMessage } from '.';
import { useSocketContext } from '../context/SocketContext';
import { RootState } from '../redux/reducer';
import { setMessages } from '../redux/slice/ConversationSlice';
import { setEmojis } from '../redux/slice/ReactMessageSlice';

const useListenMessage = () => {
	const dispatch = useDispatch();
	const { sendMessage } = useMessage();

	const { messages, selectedConversation: userSelect } = useSelector(
		(state: RootState) => state.conversation
	);
	const { data } = useSelector((state: RootState) => state.reactMessage);
	const auth = useSelector((state: RootState) => state.auth.user);
	const { socket } = useSocketContext();

	useEffect(() => {
		(socket as Socket | null)?.on('newMessage', (newMessage: any) => {
			console.log('newMessage');
			if (
				newMessage.senderId === userSelect?._id ||
				newMessage.senderId === auth._id
			) {
				const messageIndex = messages.findIndex(
					(message: any) => message._id === newMessage._id
				);

				if (messageIndex !== -1) {
					// Thay thế message cũ bằng newMessage
					const updatedMessages: any = [...messages];
					updatedMessages[messageIndex] = newMessage;
					dispatch(setMessages(updatedMessages));
				} else {
					dispatch(setMessages([...messages, newMessage]));
				}
			}
		});

		(socket as Socket | null)?.on('newReplyMessage', (newMessage: any) => {
			console.log('newReplyMessage socket');

			dispatch(setMessages([...messages, newMessage]));
		});

		(socket as Socket | null)?.on('newReactMessage', (newReactMessage: any) => {
			console.log('newReactMessage socket');
			const isDelete = data?.some((item) => item._id === newReactMessage._id);
			if (isDelete) {
				const datapop = data?.filter((item) => item._id != newReactMessage._id);
				dispatch(setEmojis(datapop));
			} else {
				console.log(newReactMessage);
				dispatch(setEmojis([newReactMessage]));
			}
		});

		return () => {
			(socket as Socket | null)?.off('newMessage');
			(socket as Socket | null)?.off('newReplyMessage');
			(socket as Socket | null)?.off('newReactMessage');
		};
	}, [socket, messages, sendMessage]);
};

export default useListenMessage;

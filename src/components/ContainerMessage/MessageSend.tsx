import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useMessage, useReplyMessage } from '../../hooks';
import { RootState } from '../../redux/reducer';
import ReplyBox from './ReplyBox';
import { useDispatch } from 'react-redux';
import { unSelectMessage } from '../../redux/slice/ReplyMessageSlice';

const MessageSend = ({ receiverId }: any) => {
	const [message, setMessage] = useState<string>('');
	const dispatch = useDispatch();
	const { loading } = useSelector((state: RootState) => state.conversation);
	const { showBox, messagesSelect } = useSelector(
		(state: RootState) => state.replyMessage
	);
	const { sendMessage } = useMessage();
	const { sendReplyMessage } = useReplyMessage();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!message) return;
		if (!showBox) {
			await sendMessage(receiverId, message);
			setMessage('');
		} else {
			if (!messagesSelect?._id) return;
			await sendReplyMessage(messagesSelect?._id, receiverId, message);

			setMessage('');
		}
		dispatch(unSelectMessage());
	};

	return (
		<form onSubmit={handleSubmit}>
			<ReplyBox />
			<div className="flex items-center w-full gap-2 px-4">
				<input
					type="text"
					className="text-sm border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white border-none outline-none"
					placeholder="Aa"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type="submit">
					{loading ? (
						<div className="loading loading-spinner "></div>
					) : (
						<IoIosSend size={24} className="hover:text-sky-500" />
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageSend;

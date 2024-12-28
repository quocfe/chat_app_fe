import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useListenMessage from '../../hooks/useListenMessage';
import { IFMessage } from '../../models/message';
import { RootState } from '../../redux/reducer';
import Message from './Message';

const Messages = () => {
	useListenMessage();

	const lastMsgRef = useRef<HTMLDivElement | null>(null);
	const messages = useSelector(
		(state: RootState) => state.conversation.messages
	);

	useEffect(() => {
		lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className="flex-1 p-2 mb-6 overflow-y-scroll">
			{messages.length != 0 ? (
				messages?.map((message: IFMessage, index: number) => (
					<div key={index} ref={lastMsgRef}>
						<Message message={message} />
					</div>
				))
			) : (
				<Profile />
			)}
		</div>
	);
};

export default Messages;

const Profile = () => {
	const userSelect = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	);
	return (
		<div className="py-10 text-sm text-center lg:pt-8">
			<img
				src={userSelect?.profilePic}
				className="w-24 h-24 mx-auto mb-3 rounded-full"
			/>
			<div className="mt-8">
				<div className="text-base font-medium text-black md:text-xl dark:text-white">
					{' '}
					{userSelect?.fullName}{' '}
				</div>
				<div className="text-sm text-gray-500 dark:text-white/80">
					{' '}
					@ {userSelect?.username}{' '}
				</div>
			</div>
		</div>
	);
};

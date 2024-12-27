/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdReply } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

const ReplyMessage = ({ fromMe, replyMessage }: any) => {
	const auth = useSelector((state: RootState) => state.auth.user);
	const { selectedConversation, messages } = useSelector(
		(state: RootState) => state.conversation
	);

	const position = fromMe ? 'right-[60px]' : 'left-[60px]';
	const alignment = fromMe ? 'items-end' : 'items-start';
	const userReply =
		replyMessage?.senderId !== auth._id
			? `${selectedConversation?.fullName.split(' ').pop()} đã trả lời bạn`
			: `Bạn đã trả lời ${selectedConversation?.fullName.split(' ').pop()}`;

	const check: any = messages.find(
		(item: any) => item?._id === replyMessage?.oldMessage
	);

	return (
		<div className={`absolute top-[0] translate-y-[-70%] ${position}`}>
			<div className={`flex flex-col-reverse ${alignment}`}>
				<div className="bg-hover rounded-2xl px-3 py-2 h-[46px] w-fit">
					<p className="text-text_secondary text-[12px] pb-3 w-fit">
						{check?.statusUnSend === 'everyone'
							? 'Tin nhắn đã được thu hồi'
							: replyMessage?.oldMessage?.message || check?.message || ''}
					</p>
				</div>
				<div className="text-text_secondary text-[12px] flex items-center gap-2 mb-1">
					<MdReply />
					{userReply}
				</div>
			</div>
		</div>
	);
};

export default ReplyMessage;

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { RootState } from '../../redux/reducer';
import { extractTime } from '../../utils/extractTime';
import IconHover from '../IconHover/IconHover';
import ReactToolTip from '../ReactToolTip/ReactToolTip';
import ReactMessage from './ReactMessage';
import ReplyMessage from './ReplyMessage';

const Message = ({ message }: any) => {
	const auth: IFUserInSideBar = useSelector(
		(state: RootState) => state.auth.user
	);
	const { data: reactMessages } = useSelector(
		(state: RootState) => state.reactMessage
	);
	const selectedConversation = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	) as IFUserInSideBar | null;
	const [messageWidth, setMessageWidth] = useState<number | null>(null);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const fromMe = message.senderId === auth._id;
	const chatClassName = fromMe ? 'chat-end' : 'chat-start';
	const positonClassName = fromMe ? 'left' : 'right';
	const profilePic = fromMe
		? auth.profilePic
		: selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
	const formattedTime = extractTime(message.createdAt);
	const messageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (messageRef.current) {
				const width = messageRef.current.offsetWidth;
				setMessageWidth(width);
			}
		};
		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => {
			window.removeEventListener('resize', updateWidth);
		};
	}, []);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const reactMessage = reactMessages?.filter(
		(item: any) => item.messageId === message._id
	);

	return message?.statusUnSend === ' ' ||
		(message?.statusUnSend === 'me' &&
			message?.unSend?.every((item: any) => item != auth._id)) ? (
		<div
			className={`chat ${chatClassName} relative ${
				message?.replyMessage ? 'mt-[50px]' : ''
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{message?.replyMessage && (
				<ReplyMessage fromMe={fromMe} replyMessage={message} />
			)}

			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="Profile Pic" src={profilePic} />
				</div>
			</div>
			<div className="flex flex-col items-start">
				<ReactToolTip
					theme="dark"
					position={positonClassName}
					title={formattedTime}
					widthRef={messageWidth}
				>
					<p
						className={`text-white max-w-[100%] chat-bubble chat-bubble-info text-justify ${bubbleBgColor}`}
						ref={messageRef}
					>
						{message.replyMessage || message.message}
					</p>
				</ReactToolTip>
				{reactMessage.length !== 0 && (
					<ReactMessage
						fromMe={fromMe}
						id={message._id}
						reactMessage={reactMessage}
					/>
				)}
			</div>
			<IconHover
				className={isHovered ? 'visible' : 'hidden'}
				// className="visible"
				position={positonClassName}
				widthRef={messageWidth}
				message={message}
				isHovered={isHovered}
				reactMessage={reactMessage}
			/>
		</div>
	) : message?.statusUnSend == 'everyone' ? (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="Profile Pic" src={profilePic} />
				</div>
			</div>
			<div className="chat-bubble">Tin nhắn đã thu hồi</div>
		</div>
	) : (
		''
	);
};

export default Message;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import { useSocketContext } from '../../context/SocketContext';
import useMessage from '../../hooks/useMessage';
import { IFMessage } from '../../models/message';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { RootState } from '../../redux/reducer';
import { useReactMessage, useUser } from '../../hooks';

interface Props {
	user: IFUserInSideBar;
	handleClick: () => void;
	msg: any;
}

const UserSideBar: React.FC<Props> = ({ user, handleClick, msg }) => {
	const { getMessage } = useMessage();
	const [notiNewMessage, setNotiNewMessage] = useState<number>(0);
	const { getReactMessage } = useReactMessage();
	const { getUserById } = useUser();
	const { onlineUsers, socket } = useSocketContext();
	const [lastMessage, setLastMessage] = useState<string>('');
	const userSelected = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	) as IFUserInSideBar | null;

	const checkStateEmoji = useSelector(
		(state: RootState) => state.reactMessage.loading
	);

	const isSelect = user?._id === userSelected?._id;
	const userOnline = onlineUsers.includes(user?._id);

	useEffect(() => {
		const fetchData = async () => {
			if (userSelected?._id) {
				await getMessage(userSelected?._id);
				await getReactMessage();
			}
		};
		fetchData();
	}, [userSelected, socket]);

	useEffect(() => {
		const fetchData = async () => {
			await getReactMessage();
		};
		fetchData();
	}, [checkStateEmoji]);

	useEffect(() => {
		const formatMessage = () => {
			const data =
				msg?.senderId === user?._id
					? `${user.fullName.split(' ').pop()}: ${msg.message} `
					: `Bạn: ${msg?.message ? msg?.message : msg?.replyMessage}`;
			setLastMessage(data);
		};
		formatMessage();
	}, [msg, user]);

	useEffect(() => {
		const handleNewMessage = async (newMessage: IFMessage) => {
			const response = await getUserById(newMessage.receiverId);
			const userReceiver = response.data;
			const data =
				newMessage?.senderId === user?._id
					? `${userReceiver.fullName.split(' ').pop()}: ${newMessage.message}`
					: `Bạn: ${newMessage?.message}`;
			setLastMessage(data);
		};

		(socket as Socket | null)?.on('newMessage', handleNewMessage);

		return () => {
			(socket as Socket | null)?.off('newMessage', handleNewMessage);
		};
	}, [socket, getUserById, user]);

	useEffect(() => {
		isSelect ? setNotiNewMessage(0) : '';
	}, [isSelect]);

	return (
		<div
			className={`flex flex-row-reverse items-center justify-end gap-4 p-2 rounded-lg cursor-pointer hover:bg-hover ${
				isSelect ? 'bg-active' : ''
			} relative `}
			onClick={handleClick}
		>
			<div className="flex flex-col">
				<p className="text-white text-[16px] font-semibold">{user.fullName}</p>
				{msg === undefined ? (
					''
				) : (
					<span className="text-[14px] overflow-hidden line-clamp-1 break-words">
						{lastMessage}
					</span>
				)}
			</div>
			<div className={`avatar ${userOnline ? 'online' : ''}`}>
				<div className="rounded-full w-14">
					<img src={user.profilePic} alt={user.fullName} />
				</div>
			</div>
			{notiNewMessage != 0 && !isSelect ? (
				<div className="absolute w-[25px] h-[25px] rounded-full right-2 top-[50%] -translate-y-[50%] bg-red-500 flex items-center justify-center ">
					<span className="text-sm text-white">{notiNewMessage}</span>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default UserSideBar;

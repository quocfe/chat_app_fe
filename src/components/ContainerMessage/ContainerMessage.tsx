import { TiMessages } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../../context/SocketContext';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { RootState } from '../../redux/reducer';
import MessageSend from './MessageSend';
import Messages from './Messages';

const ContainerMessage = () => {
	const { onlineUsers } = useSocketContext();
	const receiver = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	) as IFUserInSideBar | null;
	const userOnline = onlineUsers.includes(receiver?._id);

	return (
		<div className="h-full md:flex-1">
			{!receiver ? (
				<NoChatSelected />
			) : (
				<div className="flex flex-col h-[100%] justify-evenly ">
					<div className="bg-primary shadow shadow-shadow_2 h-[60px] rounded-lg flex  gap-3 items-center p-2  text-white ml-2">
						<div className={`avatar ${userOnline ? 'online' : ' '}`}>
							<div className="w-8 rounded-full">
								<img src={receiver.profilePic} alt={receiver.fullName} />
							</div>
						</div>
						<div className="flex flex-col items-start justify-between">
							<span className="text-xl font-medium">{receiver?.fullName}</span>
							{userOnline && (
								<div className="flex items-center justify-between">
									<p className="text-[10px] ">Đang hoạt động</p>
								</div>
							)}
						</div>
					</div>

					<Messages />
					<MessageSend receiverId={receiver?._id} />
				</div>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const auth = useSelector(
		(state: RootState) => state.auth.user
	) as IFUserInSideBar | null;
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="flex flex-col items-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl">
				<p>Welcome 👋 {auth?.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl text-center md:text-6xl" />
			</div>
		</div>
	);
};

export default ContainerMessage;

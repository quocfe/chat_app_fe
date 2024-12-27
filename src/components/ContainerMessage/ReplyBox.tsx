import { FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { IFUserInSideBar } from '../../models/userInSideBar';
import { RootState } from '../../redux/reducer';
import { unSelectMessage } from '../../redux/slice/ReplyMessageSlice';

const ReplyBox = () => {
	const dispatch = useDispatch();
	const { showBox, messagesSelect } = useSelector(
		(state: RootState) => state.replyMessage
	);
	const auth: IFUserInSideBar = useSelector(
		(state: RootState) => state.auth.user
	);
	const selectedConversation: IFUserInSideBar | null = useSelector(
		(state: RootState) => state.conversation.selectedConversation
	);

	let userReply =
		messagesSelect?.senderId != auth._id
			? selectedConversation?.fullName.split(' ').pop()
			: 'chính mình';

	return (
		<div
			className={`${
				showBox ? 'flex' : 'hidden'
			} items-start justify-between px-4 p-2 border-t-2 border-t-borderColor`}
		>
			<div className=" w-[400px]">
				<p className="mb-1 text-sm font-semibold text-white ">
					Đang trả lời {userReply}
				</p>
				<p className="font-[500] text-[11px] overflow-hidden line-clamp-1 break-words">
					{messagesSelect?.message}
				</p>
			</div>
			<div
				className="cursor-pointer"
				onClick={() => dispatch(unSelectMessage())}
			>
				<FaXmark />
			</div>
		</div>
	);
};

export default ReplyBox;

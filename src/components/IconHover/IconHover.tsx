import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdInsertEmoticon, MdReply } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { selectMessage } from '../../redux/slice/ReplyMessageSlice';
import Emoji from './Emoji';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import OptionMessage from './../OptionMessage/OptionMessage';

const iconArr = [
	{ title: 'threeDot', icon: <BsThreeDotsVertical /> },
	{ title: 'reply', icon: <MdReply /> },
	{ title: 'Emoji', icon: <MdInsertEmoticon /> },
];

const IconHover = ({
	position,
	widthRef,
	className,
	message,
	isHovered,
}: any) => {
	const dispatch = useDispatch();
	const [showEmoji, setShowEmoji] = useState<boolean>(false);
	const [showOption, setShowOption] = useState<boolean>(false);
	const showboxEmoji = useSelector(
		(state: RootState) => state.reactMessage.data
	);
	const newPosition = position === 'right' ? 'left' : 'right';
	const style: React.CSSProperties = {
		[newPosition]: widthRef ? `${widthRef + 70}px` : '',
	};

	useEffect(() => {
		if (!isHovered) {
			setShowOption(false);
			setShowEmoji(false);
		}
	}, [isHovered]);

	const handleThreeDot = () => {
		setShowOption(!showOption);
	};

	const handleReply = () => {
		dispatch(selectMessage(message));
	};

	const handleEmoji = () => {
		setShowEmoji(!showEmoji);
	};

	useEffect(() => {
		setShowEmoji(false);
	}, [showboxEmoji]);

	const handleClickIcon = (title: string) => {
		switch (title) {
			case 'threeDot':
				handleThreeDot();
				break;
			case 'reply':
				handleReply();
				break;
			case 'Emoji':
				handleEmoji();
				break;
			default:
				break;
		}
	};

	return (
		<div
			style={style}
			className={`absolute flex items-center justify-around top-[50%] -translate-y-2/4 ${className} `}
		>
			{showEmoji && <Emoji message={message} />}
			{showOption && <OptionMessage message={message} />}
			{iconArr.map(({ icon, title }, index) => (
				<div
					key={index}
					onClick={() => handleClickIcon(title)}
					className="p-2 bg-transparent rounded-full cursor-pointer select-none hover:bg-hover"
				>
					{icon}
				</div>
			))}
		</div>
	);
};

export default IconHover;

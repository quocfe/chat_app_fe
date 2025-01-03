/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { useReactMessage } from '../../hooks';
import { IFReactMessage } from '../../models/reactMessage';
import { RootState } from '../../redux/reducer';

const EmojiArr = [
	{
		alt: '❤',
		src: 'https://static.xx.fbcdn.net/images/emoji.php/v9/tf3/2/32/2764.png',
	},
	{
		alt: '😆',
		src: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t2d/2/32/1f606.png',
	},
	{
		alt: '😮',
		src: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t1a/2/32/1f62e.png',
	},
	{
		alt: '😢',
		src: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t67/2/32/1f622.png',
	},
	{
		alt: '😠',
		src: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t65/2/32/1f620.png',
	},
	{
		alt: '👍',
		src: 'https://static.xx.fbcdn.net/images/emoji.php/v9/t55/2/32/1f44d.png',
	},
];

const Emoji = ({ message }: any) => {
	const { updateReactMessage, deleteReactMessage, setReactMessage } =
		useReactMessage();
	const auth = useSelector((state: RootState) => state.auth.user);

	const reactMessage = useSelector(
		(state: RootState) => state.reactMessage.data
	);

	const checkAuth = reactMessage?.filter(
		(item: IFReactMessage) => item.senderId === auth._id
	);
	const checkMessage = checkAuth?.filter(
		(item: IFReactMessage) => item.messageId == message._id
	);

	const handleClickEmoji = (emojiSrc: string) => {
		console.log(checkAuth);
		if (
			checkAuth?.length === undefined ||
			(checkMessage && checkMessage[0]?.messageId === undefined)
		) {
			setReactMessage(message._id, emojiSrc);
			console.log('add');
		} else if (checkMessage && checkMessage[0]?.emoji !== emojiSrc) {
			const data = {
				emoji: emojiSrc,
			};
			updateReactMessage(checkMessage && checkMessage[0]?._id, data);
			console.log('update');
		} else {
			console.log('delete');
			deleteReactMessage(checkMessage && checkMessage[0]?._id);
		}
	};

	return (
		<div className="class-before flex gap-2 items-center justify-around absolute w-[300px] bottom-[50px]  px-4 py-3 shadow shadow-shadow_2 rounded-full bg-primary">
			{EmojiArr?.map((emoji, index) => (
				<span
					key={index}
					className={`rounded-full shadow cursor-pointer ${
						checkAuth?.length != 0 &&
						checkMessage &&
						checkMessage[0]?.messageId === message._id
							? checkMessage[0]?.emoji === emoji.src
								? 'shadow-shadow_1 p-2'
								: ''
							: ''
					}`}
					onClick={() => handleClickEmoji(emoji.src)}
				>
					<img
						src={emoji.src}
						alt={emoji.alt}
						key={index}
						width={40}
						height={40}
					/>
				</span>
			))}
		</div>
	);
};

export default Emoji;

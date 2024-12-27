import Modal from '../Modal/Modal';

function OptionMessage({ message }: any) {
	return (
		<div className="absolute left-[-50%]  w-[fit-content] bottom-[40px]  shadow shadow-shadow_2 rounded-md bg-primary class-before">
			<ul className="p-2 text-sm text-white">
				<li className="px-4 py-2 rounded-sm cursor-pointer hover:bg-hover">
					<Modal message={message} />
				</li>
				<li className="px-4 py-2 rounded-sm cursor-pointer hover:bg-hover">
					Chuyển tiếp
				</li>
				<li className="px-4 py-2 rounded-sm cursor-pointer hover:bg-hover">
					Chỉnh sửa
				</li>
			</ul>
		</div>
	);
}

export default OptionMessage;

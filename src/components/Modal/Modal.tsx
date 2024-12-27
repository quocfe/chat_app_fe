import { useSelector } from 'react-redux';
import { useMessage } from '../../hooks';
import { RootState } from '../../redux/reducer';
import { useState } from 'react';

const Modal = ({ message }: any) => {
	console.log('message', message);
	const { unSendMessage } = useMessage();
	const auth = useSelector((state: RootState) => state.auth.user);
	const [selectedOption, setSelectedOption] = useState('me'); //
	const openModal = () => {
		const modal = document.getElementById(
			'my_modal_1'
		) as HTMLDialogElement | null;
		if (modal) {
			modal.showModal();
		}
	};

	const handleSubmit = () => {
		switch (selectedOption) {
			case 'me':
				unSendMessage(message._id, selectedOption);
				break;
			case 'everyone':
				unSendMessage(message._id, selectedOption);
				break;
			default:
				break;
		}
	};

	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};

	return (
		<>
			<p className="" onClick={openModal}>
				Xóa
			</p>
			{message.senderId != auth._id ? (
				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="text-lg font-bold">Gỡ ở phía bạn</h3>
						<p className="py-4">
							Chúng tôi sẽ gỡ tin nhắn này cho bạn. Những thành viên khác trong
							đoạn chat vẫn có thể xem được.
						</p>
						<div className="modal-action">
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="mr-2 btn btn-custom-primary">Hủy</button>
							</form>
							<button
								onClick={handleSubmit}
								className="btn btn-custom-secondary"
							>
								Xóa
							</button>
						</div>
					</div>
				</dialog>
			) : (
				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="text-lg font-bold">
							Bạn muốn gỡ tin nhắn này ở phía ai?
						</h3>
						<div className="mt-6 form-control">
							<label className="flex flex-row items-center justify-start cursor-pointer label">
								<input
									type="radio"
									name="radio-7"
									className="mr-5 radio radio-info"
									value="everyone"
									checked={selectedOption === 'everyone'}
									onChange={handleOptionChange}
								/>
								<span className="label-text font-[20px]">
									Thu hồi với mọi người
								</span>
							</label>
							<label className="flex flex-row items-center justify-start cursor-pointer label">
								<input
									type="radio"
									name="radio-7"
									className="mr-5 radio radio-info"
									value="me"
									checked={selectedOption === 'me'}
									onChange={handleOptionChange}
								/>
								<span className="label-text font-[20px]">Gỡ ở phía bạn</span>
							</label>
						</div>
						<div className="modal-action">
							<form method="dialog">
								{/* if there is a button in form, it will close the modal */}
								<button className="mr-2 btn btn-custom-primary">Hủy</button>
							</form>
							<button
								onClick={handleSubmit}
								className="btn btn-custom-secondary"
							>
								Xóa
							</button>
						</div>
					</div>
				</dialog>
			)}
		</>
	);
};

export default Modal;

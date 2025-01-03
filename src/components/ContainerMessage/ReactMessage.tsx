/* eslint-disable @typescript-eslint/no-explicit-any */
function ReactMessage({ fromMe, reactMessage }: any) {
	const positonClassName = fromMe ? 'right-[70%]' : 'left-[70%]';

	// const reactMessage = useSelector(
	// 	(state: RootState) => state.reactMessage.data
	// );

	return (
		<div
			className={`-translate-y-[7px] ${positonClassName} min-w-[40px] cursor-pointer`}
		>
			<div className="flex items-center justify-around  px-[4px] rounded-xl shadow shadow-slate-900 bg-primary">
				{reactMessage?.map((item: any) => (
					<div className="mr-[2px]">
						<img
							src={item?.emoji}
							// alt={emoji.alt}
							width={15}
							height={15}
						/>
					</div>
				))}
				<p className="text-sm ml-[6px]">{reactMessage?.length}</p>
			</div>
		</div>
	);
}

export default ReactMessage;

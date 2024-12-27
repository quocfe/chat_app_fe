/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractTime(dateString: any) {
	const currentDate = new Date();
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());

	// Kiểm tra nếu dateString đã qua ngày hiện tại 1 ngày trở đi

	if (date > currentDate) {
		return `${hours}:${minutes}`;
	} else {
		const dayOfWeek = [
			'Chủ Nhật',
			'Thứ Hai',
			'Thứ Ba',
			'Thứ Tư',
			'Thứ Năm',
			'Thứ Sáu',
			'Thứ Bảy',
		];
		const dayIndex = date.getDay();
		const dayName = dayOfWeek[dayIndex];
		return `${dayName}: ${hours}:${minutes}`;
	}
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: any) {
	return number.toString().padStart(2, '0');
}

export const formatTimeSinceDisconnect = (disconnectTime: any) => {
	const currentTime = Date.now();
	const timeDifference = currentTime - disconnectTime;
	console.log('disconnectTime', disconnectTime);
	// Chuyển thời gian từ milliseconds sang phút
	let minutes = Math.floor(timeDifference / (1000 * 60));

	// Nếu số phút lớn hơn hoặc bằng 60, chuyển thành giờ
	if (minutes >= 60) {
		let hours = Math.floor(minutes / 60);
		minutes = minutes % 60;

		// Nếu số giờ lớn hơn hoặc bằng 24, chuyển thành ngày
		if (hours >= 24) {
			const days = Math.floor(hours / 24);
			hours = hours % 24;
			return `${days} ngày, ${hours} giờ, ${minutes} phút`;
		}

		return `${hours} giờ, ${minutes} phút`;
	}

	return `${minutes} phút`;
};

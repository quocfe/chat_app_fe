import { toast } from 'react-toastify';

const baseURL = 'https://chat-app-be-17fu.onrender.com/api/';

const httpRequest = async (
	endpoint: string,
	options: RequestInit = {}
): Promise<any> => {
	const tokenInLocal = localStorage.getItem('token');
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...(tokenInLocal && {
			Authorization: `Bearer ${JSON.parse(tokenInLocal)}`,
		}),
		...options.headers,
	};

	const config: RequestInit = {
		...options,
		headers,
	};

	try {
		const response = await fetch(baseURL + endpoint, config);
		// Kiểm tra lỗi HTTP status
		if (!response.ok) {
			const errorData = await response.json();
			toast.error(errorData.error || 'Something went wrong');
		}
		// Trả về dữ liệu JSON
		return response.json();
	} catch (error) {
		console.error('HTTP Request Error:', error);
	}
};

const http = {
	get: async (endpoint: string) => {
		return await httpRequest(endpoint, { method: 'GET' });
	},
	post: async (endpoint: string, body: any) => {
		return await httpRequest(endpoint, {
			method: 'POST',
			body: JSON.stringify(body),
		});
	},
	put: async (endpoint: string, body: any) => {
		return await httpRequest(endpoint, {
			method: 'PUT',
			body: JSON.stringify(body),
		});
	},
	delete: async (endpoint: string) => {
		return await httpRequest(endpoint, { method: 'DELETE' });
	},
};

export default http;

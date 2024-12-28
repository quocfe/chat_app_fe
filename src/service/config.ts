import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://chat-app-be-17fu.onrender.com/api/',
});

axiosInstance.interceptors.request.use(
	(config) => {
		const tokenInLocal: string | null = localStorage.getItem('token');
		if (tokenInLocal !== null) {
			const accessToken: string = JSON.parse(tokenInLocal);
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;

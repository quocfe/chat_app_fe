import { ApiEndPoint } from '../../constant/ApiEndPoint';
import axiosInstance from '../config';

export const authApi = {
	async Login(params: any) {
		console.log('Login api');
		try {
			const res = await axiosInstance.post(`${ApiEndPoint.auth}/login`, {
				username: params.username,
				password: params.password,
			});

			console.log('ress', res);
			if (res.status === 200) {
				return res;
			}
		} catch (error: any) {
			return error.response;
		}
	},
	async Signup(params: any) {
		try {
			const res = await axiosInstance.post(`${ApiEndPoint.auth}/signup`, {
				fullName: params.fullName,
				username: params.username,
				password: params.password,
				confirmPassword: params.confirmPassword,
				gender: params.gender,
			});
			return res.data;
		} catch (error) {
			// console.log('error', error);
			return error;
		}
	},
};

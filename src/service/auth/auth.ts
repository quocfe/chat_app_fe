import { ApiEndPoint } from '../../constant/ApiEndPoint';
import http from '../config';

export const authApi = {
	async Login(params: any) {
		console.log('Login api');
		try {
			const res = await http.post(`${ApiEndPoint.auth}/login`, {
				username: params.username,
				password: params.password,
			});

			return res;
		} catch (error: any) {
			return error.response;
		}
	},
	async Signup(params: any) {
		try {
			const res = await http.post(`${ApiEndPoint.auth}/signup`, {
				fullName: params.fullName,
				username: params.username,
				password: params.password,
				confirmPassword: params.confirmPassword,
				gender: params.gender,
			});
			return res;
		} catch (error) {
			// console.log('error', error);
			return error;
		}
	},
};

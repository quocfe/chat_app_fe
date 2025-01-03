/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEndPoint } from '../../constant/ApiEndPoint';
import http from '../config';

export const userApi = {
	async getUsers() {
		try {
			const res = await http.get(`${ApiEndPoint.users}`);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
	async getUserById(id: string) {
		try {
			const res = await http.get(`${ApiEndPoint.users}/${id}`);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
};

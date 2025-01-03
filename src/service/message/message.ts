/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEndPoint } from '../../constant/ApiEndPoint';
import http from '../config';

export const messageApi = {
	async getMessageApi(id: string) {
		try {
			const res = await http.get(`${ApiEndPoint.message}/${id}`);

			return res;
		} catch (error: any) {
			return error.response;
		}
	},
	async sendMessageApi(id: string, message: string) {
		try {
			const res = await http.post(`${ApiEndPoint.message}/send/${id}`, {
				message,
			});
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
	async unSendMessageApi(messageId: string, statusUnSend: string) {
		try {
			const res = await http.post(
				`${ApiEndPoint.message}/unSend/${messageId}`,
				{ statusUnSend }
			);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
};

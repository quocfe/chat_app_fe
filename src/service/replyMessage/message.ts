/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEndPoint } from '../../constant/ApiEndPoint';
import http from '../config';

export const replymessageApi = {
	async getReplyMessagesApi() {
		try {
			const res = await http.get(`${ApiEndPoint.replymessage}`);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
	async sendReplyMessageApi(
		messageId: string,
		receiverId: string,
		replyMessage: string
	) {
		try {
			const res = await http.post(
				`${ApiEndPoint.replymessage}/reply/${messageId}`,
				{
					receiverId,
					replyMessage,
				}
			);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
};

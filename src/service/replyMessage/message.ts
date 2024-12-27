/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEndPoint } from '../../constant/ApiEndPoint';
import axiosRoute from '../config';

export const replymessageApi = {
	async getReplyMessagesApi() {
		try {
			const res = await axiosRoute.get(`${ApiEndPoint.replymessage}`);
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
			const res = await axiosRoute.post(
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

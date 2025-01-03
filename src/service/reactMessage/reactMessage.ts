/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiEndPoint } from '../../constant/ApiEndPoint';
import http from '../config';

export const reactmessageApi = {
	async getEmojisByMessageId() {
		try {
			const res = await http.get(`${ApiEndPoint.reactmessage}`);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},

	async sendReactMessage(messageId: string, emoji: string) {
		try {
			const res = await http.post(
				`${ApiEndPoint.reactmessage}/send/${messageId}`,
				{
					emoji,
				}
			);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},

	// eslint-disable-next-line @typescript-eslint/ban-types
	async updateReactMessage(reactMessageId: string, emoji: {}) {
		try {
			const res = await http.put(
				`${ApiEndPoint.reactmessage}/${reactMessageId}`,
				emoji
			);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},

	async deleteReactMessage(reactMessageId: string) {
		try {
			const res = await http.delete(
				`${ApiEndPoint.reactmessage}/${reactMessageId}`
			);
			return res;
		} catch (error: any) {
			return error.response;
		}
	},
};

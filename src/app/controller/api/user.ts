import axios from "axios";
import env from "react-dotenv";
import { addFlashMessage } from "@42.nl/react-flash-messages";
import { SignInUserFormStateI, UserI } from "../../types/user";

class UserAPI {
	constructor(protected url: string) {}

	async signUp(user: UserI) {
		try {
			const response = await axios.post(`${this.url}/sign-up`, user);
			if(response) return response.data;
		} catch (e) {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "User error",
				data: "Error in registration user",
			});
		}
	}

	async getUser(id: string) {
		try {
			const response = await axios.get(`${this.url}/${id}`);
			if(response) return response.data;
		} catch(e) {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "User error",
				data: "Error in getting user",
			});
		}
	}

	async signIn(user: SignInUserFormStateI) {
		try {
			const response = await axios.post(`${this.url}/sign-in`, user);
			if(response) return response.data;
		} catch (e) {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "User error",
				data: "Error in authorization",
			});
		}
	}

	async changeUser(id: string, user: FormData) {
		try {
			const response = await axios({
				data: user,
				method: "put",
				url: `${this.url}/${id}`,
				headers: { "Content-Type": "multipart/form-data" },
			});
			if(response) return response.data;
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "User error",
				data: "Error in changing user",
			});
		}
	}

	async deleteUser(id: string, avatarId: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`, { data: { avatarId: avatarId } });
			if(response) return response.data;
		} catch(e) {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "User error",
				data: "Error in deleting user",
			});
		}
	}
}

export default new UserAPI("https://recipe-app-api-amber.vercel.app/api/users");
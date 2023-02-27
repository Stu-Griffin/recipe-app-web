import axios from "axios";
import env from "react-dotenv";
import { SignInUserFormStateI, UserI } from "../../types/user";

class UserAPI {
	constructor(protected url: string) {}

	async getUser(id: string) {
		try {
			const response = await axios.get(`${this.url}/${id}`);
			if(response) return response.data;
		} catch(e) {
			console.log(e);
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
		} catch(e) {
			console.log(e);
		}
	}

	async signUp(user: UserI) {
		try {
			const response = await axios.post(`${this.url}/sign-up`, user);
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	async signIn(user: SignInUserFormStateI) {
		try {
			const response = await axios.post(`${this.url}/sign-in`, user);
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new UserAPI(`${env.API_URL}/api/users`);
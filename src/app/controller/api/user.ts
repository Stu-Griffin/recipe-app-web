import axios from "axios";
import { SignInUserFormStateI, UserI } from "../../types/user";

class UserAPI {
	constructor(protected url: string) {}

	async getUser(id: string) {
		try {
			const { data } = await axios.get(`${this.url}/${id}`);
			return data;
		} catch(e) {
			console.log(e);
		}
	}

	async changeUser(id: string, user: FormData) {
		try {
			const { data } = await axios({
				data: user,
				method: "put",
				url: `${this.url}/${id}`,
				headers: { "Content-Type": "multipart/form-data" },
			});
			return data;
		} catch(e) {
			console.log(e);
		}
	}

	async signUp(user: UserI) {
		try {
			const { data } = await axios.post(`${this.url}/sign-up`, user);
			return data;
		} catch (e) {
			console.log(e);
		}
	}

	async signIn(user: SignInUserFormStateI) {
		try {
			const { data } = await axios.post(`${this.url}/sign-in`, user);
			return data;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new UserAPI("https://recipe-app-api-amber.vercel.app/api/users");
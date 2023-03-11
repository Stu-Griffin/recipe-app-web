import axios from "axios";
import env from "react-dotenv";
import { AppDispatch } from "../../types/store";
import { changeFlashMessage } from "../redux/flashMessage";
import { SignInUserFormStateI, UserI } from "../../types/user";

class UserAPI {
	constructor(protected url: string) {}

	async signUp(dispatch:AppDispatch, user: UserI) {
		try {
			const response = await axios.post(`${this.url}/sign-up`, user);
			if(response) return response.data;
		} catch (e) {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "User error",
				description: "Error in registration user",
			}));
		}
	}

	async getUser(dispatch:AppDispatch, id: string) {
		try {
			const response = await axios.get(`${this.url}/${id}`);
			if(response) return response.data;
		} catch(e) {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "User error",
				description: "Error in getting user",
			}));
		}
	}

	async signIn(dispatch:AppDispatch, user: SignInUserFormStateI) {
		try {
			const response = await axios.post(`${this.url}/sign-in`, user);
			if(response) return response.data;
		} catch (e) {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "User error",
				description: "Error in authorization",
			}));
		}
	}

	async changeUser(dispatch:AppDispatch, id: string, user: FormData) {
		try {
			const response = await axios({
				data: user,
				method: "put",
				url: `${this.url}/${id}`,
				headers: { "Content-Type": "multipart/form-data" },
			});
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "User error",
				description: "Error in changing user",
			}));
		}
	}

	async deleteUser(dispatch:AppDispatch, id: string, avatarId: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`, { data: { avatarId: avatarId } });
			if(response) return response.data;
		} catch(e) {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "User error",
				description: "Error in deleting user",
			}));
		}
	}
}

export default new UserAPI("https://recipe-app-api-amber.vercel.app/api/users");
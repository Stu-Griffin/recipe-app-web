import axios from "axios";
import { changeRate } from "../../types/recipes";

class RecipeAPI {
	constructor(protected url: string, private cancelToken: any) {}

	async deleteRecipe(id: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`);
			if(response) return response.data;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipeBuItsId(id: string) {
		try {
			const response = await axios.get(`${this.url}/${id}`);
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	async createRecipe(recipe: FormData) {
		try {
			const response = await axios({
				data: recipe,
				method: "post",
				url: `${this.url}`,
				headers: { "Content-Type": "multipart/form-data" },
			});
			if(response) return response.data;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipeByAuthorId(id: string) {
		try {
			const response = await axios.get(`${this.url}/author/${id}`);
			if(response) return response.data;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipes(type: string, page: number) {
		if (typeof this.cancelToken !== typeof undefined) this.cancelToken.cancel("Operation canceled due to new request.");
		this.cancelToken = axios.CancelToken.source();
		try {
			const response = await axios.get(`${this.url}?type=${type}&page=${page}`, { cancelToken: this.cancelToken.token });
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	async changeRecipesRate(id: string, rate: changeRate) {
		try {
			const response = await axios.put(`${this.url}/rating/${id}`, rate);
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new RecipeAPI("https://recipe-app-api-amber.vercel.app/api/recipes", undefined);
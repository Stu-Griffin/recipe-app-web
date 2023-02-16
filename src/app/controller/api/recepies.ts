import axios from "axios";
import { changeRate } from "../../types/recipes";

class RecipeAPI {
	constructor(protected url: string) {}

	async deleteRecipe(id: string) {
		try {
			const { data } = await axios.delete(`${this.url}/${id}`);
			return data;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipeBuItsId(id: string) {
		try {
			const { data } = await axios.get(`${this.url}/${id}`);
			return data;
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
			return response?.data.status || 404;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipeByAuthorId(id: string) {
		try {
			const { data } = await axios.get(`${this.url}/author/${id}`);
			return data;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipes(type: string, page: number) {
		console.log(`${this.url}?type=${type}&page=${page}`);
		try {
			const { data } = await axios.get(`${this.url}?type=${type}&page=${page}`);
			return data;
		} catch (e) {
			console.log(e);
		}
	}

	async changeRecipesRate(id: string, rate: changeRate) {
		try {
			const { data } = await axios.put(`${this.url}/rating/${id}`, rate);
			return data;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new RecipeAPI("https://recipe-app-api-amber.vercel.app/api/recipes");
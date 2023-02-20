import axios from "axios";
import { changeRate } from "../../types/recipes";

class RecipeAPI {
	constructor(protected url: string) {}

	async deleteRecipe(id: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`);
			return response;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipeBuItsId(id: string) {
		try {
			const response = await axios.get(`${this.url}/${id}`);
			return response;
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
			return response;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipeByAuthorId(id: string) {
		try {
			const response = await axios.get(`${this.url}/author/${id}`);
			return response;
		} catch(e) {
			console.log(e);
		}
	}

	async getRecipes(type: string, page: number) {
		try {
			const response = await axios.get(`${this.url}?type=${type}&page=${page}`);
			return response;
		} catch (e) {
			console.log(e);
		}
	}

	async changeRecipesRate(id: string, rate: changeRate) {
		try {
			const response = await axios.put(`${this.url}/rating/${id}`, rate);
			return response;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new RecipeAPI("http://127.0.0.1:8000/api/recipes");
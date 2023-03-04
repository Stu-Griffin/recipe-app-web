import axios from "axios";
import env from "react-dotenv";
import { changeRate, RecipeSearchConfigI } from "../../types/recipes";

class RecipeAPI {
	constructor(protected url: string, private cancelToken: any) {}

	async getRecipeByItsId(id: string) {
		try {
			const response = await axios.get(`${this.url}/recipe/${id}`);
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

	async getRecipesByAuthorId(id: string) {
		try {
			const response = await axios.get(`${this.url}/author/${id}`);
			if(response) return response.data;
		} catch(e) {
			console.log(e);
		}
	}

	async deleteRecipe(id: string, imgId: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`, {data: { imgId: imgId }});
			if(response) return response.data;
		} catch(e) {
			console.log(e);
		}
	}

	async getSavedRecipes(savedRecipes: string[]) {
		try {
			const response = await axios.get(`${this.url}/saved-recipes`, {params: { savedRecipes: savedRecipes }});
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	async editRecipe(recipe: FormData, id: string) {
		try {
			const response = await axios({
				data: recipe,
				method: "put",
				url: `${this.url}/${id}`,
				headers: { "Content-Type": "multipart/form-data" },
			});
			if(response) return response.data;
		} catch(e) {
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

	async getRecipes(type: string, page: number|undefined, options: RecipeSearchConfigI) {
		if (typeof this.cancelToken !== typeof undefined) this.cancelToken.cancel("Operation canceled due to new request.");
		this.cancelToken = axios.CancelToken.source();
		
		try {
			const response = await axios.get(`${this.url}`, { 
				params: { 
					type: type,
					page: page,
					...options
				},
				cancelToken: this.cancelToken.token 
			});
			if(response) return response.data;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new RecipeAPI(`${env.API_URL}/api/recipes`, undefined);
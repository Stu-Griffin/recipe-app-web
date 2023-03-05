import axios from "axios";
import env from "react-dotenv";
import { addFlashMessage } from "@42.nl/react-flash-messages";
import { changeRate, RecipeSearchConfigI } from "../../types/recipes";

class RecipeAPI {
	constructor(protected url: string, private cancelToken: any) {}

	async getRecipeByItsId(id: string) {
		try {
			const response = await axios.get(`${this.url}/recipe/${id}`);
			if(response) return response.data;
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in getting recipe",
			});
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
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in creating recipe",
			});
		}
	}

	async getRecipesByAuthorId(id: string) {
		try {
			const response = await axios.get(`${this.url}/author/${id}`);
			if(response) return response.data;
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in getting authors recipes",
			});
		}
	}

	async deleteRecipe(id: string, imgId: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`, {data: { imgId: imgId }});
			if(response) return response.data;
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in deleting recipe",
			});
		}
	}

	async getSavedRecipes(savedRecipes: string[]) {
		try {
			const response = await axios.get(`${this.url}/saved-recipes`, {params: { savedRecipes: savedRecipes }});
			if(response) return response.data;
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in getting saved recipes",
			});
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
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in editting recipe",
			});
		}
	}

	async changeRecipesRate(id: string, rate: changeRate) {
		try {
			const response = await axios.put(`${this.url}/rating/${id}`, rate);
			if(response) return response.data;
		} catch {
			addFlashMessage({
				type: "ERROR", 
				duration: 2000,
				text: "Recipe error",
				data: "Error in chaging recipes rate",
			});
		}
	}

	async getRecipes(type: string, page: number|undefined, options: RecipeSearchConfigI) {
		if (typeof this.cancelToken !== typeof undefined) this.cancelToken.cancel("Operation canceled due to new request.");
		this.cancelToken = axios.CancelToken.source();
		
		const response = await axios.get(`${this.url}`, { 
			params: { 
				type: type,
				page: page,
				...options
			},
			cancelToken: this.cancelToken.token 
		});
		if(response) return response.data;
	}
}

export default new RecipeAPI("https://recipe-app-api-amber.vercel.app/api/recipes", undefined);
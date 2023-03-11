import axios from "axios";
import env from "react-dotenv";
import { AppDispatch } from "../../types/store";
import { changeFlashMessage } from "../redux/flashMessage";
import { changeRate, RecipeSearchConfigI } from "../../types/recipes";

class RecipeAPI {
	constructor(protected url: string, private cancelToken: any) {}

	async getRecipeByItsId(dispatch: AppDispatch, id: string) {
		try {
			const response = await axios.get(`${this.url}/recipe/${id}`);
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "Recipe error",
				description: "Error in getting recipe",
			}));
		}
	}

	async createRecipe(dispatch: AppDispatch, recipe: FormData) {
		try {
			const response = await axios({
				data: recipe,
				method: "post",
				url: `${this.url}`,
				headers: { "Content-Type": "multipart/form-data" },
			});
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "Recipe error",
				description: "Error in creating recipe",
			}));
		}
	}

	async getRecipesByAuthorId(dispatch: AppDispatch, id: string) {
		try {
			const response = await axios.get(`${this.url}/author/${id}`);
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "Recipe error",
				description: "Error in getting authors recipes",
			}));
		}
	}

	async deleteRecipe(dispatch: AppDispatch, id: string, imgId: string) {
		try {
			const response = await axios.delete(`${this.url}/${id}`, {data: { imgId: imgId }});
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "Recipe error",
				description: "Error in deleting recipe",
			}));
		}
	}

	async getSavedRecipes(dispatch: AppDispatch, savedRecipes: string[]) {
		try {
			const response = await axios.get(`${this.url}/saved-recipes`, {params: { savedRecipes: savedRecipes }});
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "Recipe error",
				description: "Error in getting saved recipes",
			}));
		}
	}

	async editRecipe(dispatch: AppDispatch, recipe: FormData, id: string) {
		try {
			const response = await axios({
				data: recipe,
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
				message: "Recipe error",
				description: "Error in editting recipe",
			}));
		}
	}

	async changeRecipesRate(dispatch: AppDispatch, id: string, rate: changeRate) {
		try {
			const response = await axios.put(`${this.url}/rating/${id}`, rate);
			if(response) return response.data;
		} catch {
			dispatch(changeFlashMessage({
				show: true,
				duration: 2000,
				status: "ERROR",
				message: "Recipe error",
				description: "Error in chaging recipes rate",
			}));
		}
	}

	async getRecipes(dispatch: AppDispatch, type: string, page: number|undefined, options: RecipeSearchConfigI) {
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
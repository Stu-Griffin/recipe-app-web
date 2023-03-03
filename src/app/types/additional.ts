import { RecipeSearchConfigI } from "./recipes";

export interface AdditionalStateI {
	recipeType: string;
	editRecipeId: string;
	loadingStatus: boolean;
	[key: string]: string|boolean|RecipeSearchConfigI;
}
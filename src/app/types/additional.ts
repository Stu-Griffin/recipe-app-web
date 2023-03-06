import { RecipeSearchConfigI } from "./recipes";

export interface AdditionalStateI {
	recipeType: string;
	loadingStatus: boolean;
	[key: string]: string|boolean|RecipeSearchConfigI;
}
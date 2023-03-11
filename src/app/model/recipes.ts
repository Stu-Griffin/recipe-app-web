import { 
	RecipeFormStateI, 
	RecipeSearchConfigI, 
	RecipeErrorFormStateI, 
	RecipeErrorSearchConfigI 
} from "../types/recipes";

export const recipeFormState: RecipeFormStateI = {
	rate: 0,
	type: "",
	steps: [],
	title: "",
	image: null,
	authorId: "",
	ingredients: [],
	authorLogin: "",
	description: "",
};

export const recipeSearchConfig: RecipeSearchConfigI = {
	rate: "",
	title: "",
	author: "",
};

export const recipeErrorFormState: RecipeErrorFormStateI = {
	steps: null,
	image: null,
	title: null,
	ingredients: null,
	description: null,
};

export const recipeErrorSearchConfig: RecipeErrorSearchConfigI = {
	rate: null,
	title: null,
	author: null,
};

export const recipeTypes: Array<string> = ["Appetizers", "Salads", "Soups", "Main", "Deserts"];
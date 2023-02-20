import { RecipeFormStateI, RecipeFormActionI, RecipeErrorFormStateI, RecipeErrorFormActionI } from "../types/recipes";

export function recipeFormReducer(state: RecipeFormStateI, action: RecipeFormActionI): RecipeFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	case "addSteps":
		return {...state, [action.payload.key]: [...state.steps, action.payload.value]};
	case "deleteSteps":
		return {...state, [action.payload.key]: state.steps.filter((el: string, id: number) => id !== action.payload.value)};
	case "addIngredients": 
		return {...state, [action.payload.key]: [...state.ingredients, action.payload.value]};
	case "deleteIngredients":
		return {...state, [action.payload.key]: state.ingredients.filter((el: string, id: number) => id !== action.payload.value)};
	default:
		return state;
	}
}

export function recipeErrorFormReducer(state: RecipeErrorFormStateI, action: RecipeErrorFormActionI): RecipeErrorFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}
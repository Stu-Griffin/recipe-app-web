import { RecipeFormStateI, RecipeFormActionI, RecipeErrorFormStateI, RecipeErrorFormActionI } from "../types/recipes";

export function recipeFormReducer(state: RecipeFormStateI, action: RecipeFormActionI): RecipeFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	case "addSteps":
		return {...state, [action.payload.key]: [...state.steps, action.payload.value]};
	case "moveSteps": 
		state.steps.splice(action.payload.value.what, 1);
		state.steps.splice(action.payload.value.where, 0, action.payload.value.el);
		return state;
	case "deleteSteps":
		return {...state, [action.payload.key]: state.steps.filter((el: string, id: number) => id !== action.payload.value)};
	case "addIngredients": 
		return {...state, [action.payload.key]: [...state.ingredients, action.payload.value]};
	case "moveIngredient": 
		state.ingredients.splice(action.payload.value.what, 1);
		state.ingredients.splice(action.payload.value.where, 0, action.payload.value.el);
		return state;
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
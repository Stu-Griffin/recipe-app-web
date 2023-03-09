import { recipeFormState } from "../model/recipes";
import { RecipeFormStateI, RecipeFormActionI, RecipeErrorFormStateI, RecipeErrorSearchConfigI, RecipeSearchConfigI, RecipeErrorFormActionI, RecipeSearchConfigActionI, RecipeErrorSearchConfigActionI, PickImageArgI } from "../types/recipes";

export function recipeFormReducer(state: RecipeFormStateI, action: RecipeFormActionI): RecipeFormStateI {
	switch (action.type) {
	case "set": 
		return (action.payload.value as RecipeFormStateI);
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	case "clear": 
		return recipeFormState;
	case "addSteps":
		return {...state, [action.payload.key]: [...state.steps, action.payload.value]};
	case "moveSteps": 
		state.steps.splice((action.payload.value as PickImageArgI).what, 1);
		state.steps.splice((action.payload.value as PickImageArgI).where, 0, (action.payload.value as PickImageArgI).el);
		return state;
	case "editSteps":
		state.steps[+(action.payload.key)] = (action.payload.value as string);
		return {...state};
	case "deleteSteps":
		return {...state, [action.payload.key]: state.steps.filter((el: string, id: number) => id !== action.payload.value)};
	case "addIngredients": 
		return {...state, [action.payload.key]: [...state.ingredients, action.payload.value]};
	case "moveIngredient": 
		state.ingredients.splice((action.payload.value as PickImageArgI).what, 1);
		state.ingredients.splice((action.payload.value as PickImageArgI).where, 0, (action.payload.value as PickImageArgI).el);
		return state;
	case "editIngredients":
		state.ingredients[+(action.payload.key)] = (action.payload.value as string);
		return {...state};
	case "deleteIngredients":
		return {...state, [action.payload.key]: state.ingredients.filter((el: string, id: number) => id !== action.payload.value)};
	default:
		return state;
	}
}

export function recipeErrorFormReducer(state: RecipeErrorFormStateI, action: RecipeErrorFormActionI): RecipeErrorFormStateI {
	switch (action.type) {
	case "set": 
		return (action.payload.value as RecipeErrorFormStateI);
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}

export function recipeSearchConfigReducer(state: RecipeSearchConfigI, action: RecipeSearchConfigActionI): RecipeSearchConfigI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}

export function recipeErrorSearchConfigReducer(state: RecipeErrorSearchConfigI, action: RecipeErrorSearchConfigActionI): RecipeErrorSearchConfigI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}
import { createSlice } from "@reduxjs/toolkit";
import { RecipesStateI, SavedRecipeI } from "../../types/recipes";

const recipesState: RecipesStateI = {
	savedRecipes: [],
};

export const recipesSlice = createSlice({
	name: "recipes",
	initialState: recipesState,
	reducers: {
		addSavedRecipe: (state: RecipesStateI, action): RecipesStateI => {
			state.savedRecipes.push(action.payload);
			return state;
		},
		removeSavedRecipe: (state: RecipesStateI, action): RecipesStateI => {
			state.savedRecipes = state.savedRecipes.filter((el: SavedRecipeI) => el._id !== action.payload);
			return state;
		},
	},
});

export const { addSavedRecipe, removeSavedRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
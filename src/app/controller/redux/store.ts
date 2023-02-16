import profileReducer from "./profile";
import recipesReducer from "./recipes";
import adittionalReducer from "./addtional";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		recipes: recipesReducer,
		additional: adittionalReducer,
	},
});
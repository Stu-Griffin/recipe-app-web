import profileReducer from "./profile";
import recipesReducer from "./recipes";
import additionalReducer from "./additional";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		recipes: recipesReducer,
		additional: additionalReducer,
	},
});
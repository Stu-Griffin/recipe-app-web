import profileReducer from "./profile";
import additionalReducer from "./additional";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		additional: additionalReducer,
	},
});
import profileReducer from "./profile";
import additionalReducer from "./additional";
import FlashMessageReducer from "./flashMessage";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		additional: additionalReducer,
		flashMessage: FlashMessageReducer,
	},
});
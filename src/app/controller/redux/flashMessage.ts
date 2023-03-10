import { createSlice } from "@reduxjs/toolkit";
import { FlashMessageI } from "../../types/flashMessage";

const flashMessageState: FlashMessageI = {
	status: "",
	show: false,
	message: "",
	duration: null,
	description: "",
};

export const flashMessageSlice = createSlice({
	name: "flashMessage",
	initialState: flashMessageState,
	reducers: {
		changeFlashMessage: (state: FlashMessageI, action): FlashMessageI => {
			return action.payload;
		},
		changeFlashMessageShowStatus: (state: FlashMessageI, action): FlashMessageI => {
			state.show = action.payload;
			return state;
		},
	},
});

export const { changeFlashMessage, changeFlashMessageShowStatus } = flashMessageSlice.actions;

export default flashMessageSlice.reducer;
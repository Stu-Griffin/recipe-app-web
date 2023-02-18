import { createSlice } from "@reduxjs/toolkit";
import { AdittionalStateI } from "../../types/additional";

const adittionalState: AdittionalStateI = {
	rate: "all",
	loadingStatus: false,
	recipeType: "appetizers",
};

export const adittionalSlice = createSlice({
	name: "adittional",
	initialState: adittionalState,
	reducers: {
		changeAdditionalValue: (state: AdittionalStateI, action): AdittionalStateI => {
			state[action.payload.key] = action.payload.value;
			return state;
		},
	},
});

export const { changeAdditionalValue } = adittionalSlice.actions;

export default adittionalSlice.reducer;
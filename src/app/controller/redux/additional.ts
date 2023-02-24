import { createSlice } from "@reduxjs/toolkit";
import { AdditionalStateI } from "../../types/additional";

const additionalState: AdditionalStateI = {
	rate: "all",
	loadingStatus: false,
	recipeType: "appetizers",
};

export const additionalSlice = createSlice({
	name: "additional",
	initialState: additionalState,
	reducers: {
		changeAdditionalValue: (state: AdditionalStateI, action): AdditionalStateI => {
			state[action.payload.key] = action.payload.value;
			return state;
		},
	},
});

export const { changeAdditionalValue } = additionalSlice.actions;

export default additionalSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { ProfileStateI } from "../../types/profile";

const profileState: ProfileStateI = {
	user: {
		login: "",
		avatar: "",
		avatarId: "",
	},
	userId: "",
	// userId: "63f241c7ed638a95b83f7575",
};

export const profileSlice = createSlice({
	name: "profile",
	initialState: profileState,
	reducers: {
		changeProfileValue: (state: ProfileStateI, action): ProfileStateI => {
			state[action.payload.key] = action.payload.value;
			return state;
		},
		changeUserProfileValue : (state: ProfileStateI, action): ProfileStateI => {
			state.user[action.payload.key] = action.payload.value;
			return state;
		},
	},
});

export const { changeUserProfileValue, changeProfileValue } = profileSlice.actions;

export default profileSlice.reducer;
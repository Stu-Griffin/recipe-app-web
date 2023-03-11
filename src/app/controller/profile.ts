import { 
	profileFormState,
	profileErrorFormState, 
} from "../model/profile";
import { 
	ProfileFormStateI, 
	ProfileFormActionI, 
	ProfileErrorFormStateI, 
	ProfileErrorFormActionI,
} from "../types/profile";

export function profileFormReducer(state: ProfileFormStateI, action: ProfileFormActionI): ProfileFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	case "clear": 
		return profileFormState;
	default:
		return state;
	}
}

export function profileErrorFormReducer(state: ProfileErrorFormStateI, action: ProfileErrorFormActionI): ProfileErrorFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	case "clear": 
		return profileErrorFormState;
	default:
		return state;
	}
}
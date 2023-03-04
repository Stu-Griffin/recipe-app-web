import { SignInUserFormStateI, SignInUserErrorFormStateI, SignInUserErrorFormActionI, SignInUserFormActionI, SignUpUserFormStateI, SignUpUserErrorFormStateI, SignUpUserFormActionI, SignUpUserErrorFormActionI} from "../types/user";

export function signInUserFormReducer(state: SignInUserFormStateI, action: SignInUserFormActionI): SignInUserFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}

export function signUpUserFormReducer(state: SignUpUserFormStateI, action: SignUpUserFormActionI): SignUpUserFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}

export function signInUserErrorFormReducer(state: SignInUserErrorFormStateI, action: SignInUserErrorFormActionI): SignInUserErrorFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}

export function signUpUserErrorFormReducer(state: SignUpUserErrorFormStateI, action: SignUpUserErrorFormActionI): SignUpUserErrorFormStateI {
	switch (action.type) {
	case "add":
		return {...state, [action.payload.key]: action.payload.value};
	default:
		return state;
	}
}
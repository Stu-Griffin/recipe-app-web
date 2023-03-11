import { 
	SignInUserFormStateI, 
	SignUpUserFormStateI, 
	SignUpUserErrorFormStateI,
	SignInUserErrorFormStateI, 
} from "../types/user";

export const signInUserFormState: SignInUserFormStateI = {
	email: "",
	password: "",
};

export const signUpUserFormState: SignUpUserFormStateI = {
	login: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export const signInUserErrorFormState: SignInUserErrorFormStateI = {
	email: null,
	password: null,
};

export const signUpUserErrorFormState: SignUpUserErrorFormStateI = {
	login: null,
	email: null,
	password: null,
	confirmPassword: null,
};
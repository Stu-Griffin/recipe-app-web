//Components

//Icons

//Types
import { SignInUserFormStateI, SignInUserErrorFormStateI, SignUpUserFormStateI, SignUpUserErrorFormStateI } from "../types/user";

//Libraries

//Functions

//Models

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
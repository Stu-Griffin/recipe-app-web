export interface UserI {
	login: string;
	email: string;
	password: string;
}

export interface SignInUserFormStateI {
	email: string;
	password: string;
}

export interface SignUpUserFormStateI {
	login: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface SignInUserFormActionI {
	payload: {
		key: string;
		value: string;
	};
	type: string;
}

export interface SignUpUserFormActionI {
	payload: {
		key: string;
		value: string;
	};
	type: string;
}

export interface SignUpUserErrorFormStateI {
	login: boolean|null;
	email: boolean|null;
	password: boolean|null;
	confirmPassword: boolean|null;
}

export interface SignInUserErrorFormStateI {
	email: boolean|null;
	password: boolean|null;
}

export interface SignInUserErrorFormActionI {
	payload: {
		key: string;
		value: boolean;
	};
	type: string;
}

export interface SignUpUserErrorFormActionI {
	payload: {
		key: string;
		value: boolean;
	};
	type: string;
}
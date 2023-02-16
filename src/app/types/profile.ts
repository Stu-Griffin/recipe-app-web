export interface AvatarI {
	uri: string;
	name: string;
	type: string;
	fileName: string;
}

export interface ProfileUserI {
	login: string;
	avatar: string;
	[key: string]: string;
}

export interface ProfileStateI {
	userId: string;
	user: ProfileUserI;
	[key: string]: string|ProfileUserI;
}

export interface ProfileFormStateI {
	login: string;
	email: string;
	password: string;
	avatar: AvatarI|null;
}

export interface ProfileFormActionI {
	payload: {
		key: string;
		value: AvatarI|string|null;
	};
	type: string;
}

export interface ProfileErrorFormStateI {
	login: boolean|null;
	email: boolean|null;
	avatar: boolean|null;
	password: boolean|null;
}

export interface ProfileErrorFormActionI {
	payload: {
		key: string;
		value: boolean|null;
	};
	type: string;
}
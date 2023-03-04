export interface ProfileUserI {
	login: string;
	avatar: string;
	avatarId: string;
	savedRecipes: string[];
	[key: string]: string|string[];
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
	avatar: File|null;
}

export interface ProfileFormActionI {
	payload: {
		key: string;
		value: File|string|null|undefined;
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
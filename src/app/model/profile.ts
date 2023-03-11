import { 
	ProfileFormStateI,
	ProfileErrorFormStateI 
} from "../types/profile";


export const profileFormState: ProfileFormStateI = {
	login: "",
	email: "",
	avatar: null,
	password: "",
};

export const profileErrorFormState: ProfileErrorFormStateI = {
	login: null,
	email: null,
	avatar: null,
	password: null,
};
export interface Image {
	uri: string;
	name: string;
	type: string;
	fileName: string;
}

export interface RecipeI {
	__v: number;
	_id: string;
	type: string;
	rate: number;
	imgId: string;
	image: string;
	title: string;
	authorId: string;
	authorLogin: string;
	description: string;
	steps: Array<string>;
	ingredients: Array<string>;
}

export interface changeRate {
	rate: number;
	newRate: number;
}

export interface PickImageArgI {
	el: string;  
	what: number; 
	where: number; 
}

export interface RecipeFormStateI {
	rate: number;
	type: string;
	title: string;
	authorId: string;
	image: File|null;
	authorLogin: string;
	description: string;
	steps: Array<string>;
	ingredients: Array<string>;
}

export interface RecipeFormActionI {
	payload: {
		key: string;
		value: Image|Array<string>|string|number|File|RecipeFormStateI|PickImageArgI|undefined;
	};
	type: string;
}

export interface RecipeSearchConfigI {
	rate: string;
	title: string;
	author: string;
}

export interface RecipeErrorFormStateI {
	image: null|boolean;
	title: null|boolean;
	steps: null|boolean;
	ingredients:null|boolean;
	description: null|boolean;
}

export interface RecipeErrorFormActionI {
	payload: {
		key: string;
		value: boolean|RecipeErrorFormStateI;
	};
	type: string;
}

export interface RecipeErrorSearchConfigI {
	rate: null|boolean;
	title: null|boolean;
	author: null|boolean;
}

export interface RecipeSearchConfigActionI {
	payload: {
		key: string;
		value: string;
	};
	type: string;
}

export interface RecipeErrorSearchConfigActionI {
	payload: {
		key: string;
		value: boolean|null;
	};
	type: string;
}
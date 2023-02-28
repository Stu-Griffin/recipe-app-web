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

export interface SavedRecipeI {
	_id: string;
	rate: number;
	title: string;
	image: string;
	authorId: string;
	authorLogin: string;
}

export interface RecipesStateI {
	savedRecipes: SavedRecipeI[];
	[key: string]: SavedRecipeI[];
}

export interface RecipeFormStateI {
	rate: number;
	type: string;
	title: string;
	authorId: string;
	image: any;
	authorLogin: string;
	description: string;
	steps: Array<string>;
	ingredients: Array<string>;
}

export interface RecipeFormActionI {
	payload: {
		key: string;
		value: Image|Array<string>|string|number|any|RecipeFormStateI;
	};
	type: string;
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
export interface AdditionalStateI {
	rate: string;
	recipeType: string;
	editRecipeId: string;
	loadingStatus: boolean;
	[key: string]: string|boolean;
}
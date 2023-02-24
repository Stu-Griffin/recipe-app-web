export interface AdditionalStateI {
	rate: string;
	recipeType: string;
	loadingStatus: boolean;
	[key: string]: string|boolean;
}
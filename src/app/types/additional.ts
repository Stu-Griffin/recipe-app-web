export interface AdittionalStateI {
	rate: string;
	recipeType: string;
	loadingStatus: boolean;
	[key: string]: string|boolean;
}
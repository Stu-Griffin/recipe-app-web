export const emailValidation = (value: string): boolean => {
	const regexp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	return(value.match(regexp)) ? false : true;
};

export const regularValidation = (value: string): boolean => {
	return(value !== "") ? false : true;
};
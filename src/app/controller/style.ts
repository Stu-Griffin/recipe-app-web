export const getButtonStyle = (status: boolean): object => {
	if(status) {
		return {
			opacity: 0.5
		};
	} else {
		return {
			opacity: 1
		};
	}
};

export const recipeTypeButtonStyle = (savedValue: string, value: string): object => {
	if(savedValue === value.toLowerCase()) {
		return {
			color: "white",
			backgroundColor: "#129575",
		};
	} else {
		return {
			color: "#129575",
			backgroundColor: "white",
		};
	}
};
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
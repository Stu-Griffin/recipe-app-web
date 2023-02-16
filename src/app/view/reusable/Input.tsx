//Components

//Icons

//Types

//Libraries
import React from "react";

//Functions

//Models

interface PropsI {
	title: string;
	value: string;
	error: boolean|null;
	placeholder: string;
	onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function InputArea({ title, value, error, placeholder, onChangeFunc }: PropsI) {
	const getTitleStyle = (): object => {
		if(error && error !== null) {
			return {
				color: "red",
			};
		} else {
			return {
				color: "black",
			};
		}
	};

	const getInputStyle = (): object => {
		if(error && error !== null) {
			return {
				color: "red",
				borderColor: "red",
				outlineColor: "red",
			};
		} else {
			return {
				color: "#969696",
				borderColor: "#969696",
				outlineColor: "#969696",
			};
		}
	};

	return (
		<div className="input-area">
			<h1 style={getTitleStyle()}>{title}</h1>
			<input style={getInputStyle()} value={value} placeholder={placeholder} onChange={onChangeFunc}/>
		</div>
	);
}
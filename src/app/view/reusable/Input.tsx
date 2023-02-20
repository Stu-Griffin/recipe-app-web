//Components

//Icons

//Types

//Libraries
import React from "react";

//Functions
import styles from "../../style/reusable/input.module.css";

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
		<div className={styles.container}>
			<h3 style={getTitleStyle()}>{title}</h3>
			<input className={styles.input} style={getInputStyle()} value={value} placeholder={placeholder} onChange={onChangeFunc}/>
		</div>
	);
}
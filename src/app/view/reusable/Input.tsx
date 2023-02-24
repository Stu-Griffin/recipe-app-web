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
	style?: object;
	type ?: string;
	multiple?: boolean;
	error: boolean|null;
	placeholder: string;
	onChangeFunc: (e: string) => void;
}


export default function InputArea({ style, title, type, value, error, placeholder, onChangeFunc, multiple }: PropsI) {
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
		<div className={styles.container} style={style}>
			<h3 style={getTitleStyle()}>{title}</h3>
			{
				(multiple)
					?
					<textarea style={getInputStyle()} className={styles.input} value={value} placeholder={placeholder} onChange={(e) => onChangeFunc(e.target.value)}></textarea>
					:
					<input type={type} className={styles.input} style={getInputStyle()} value={value} placeholder={placeholder} onChange={(e) => onChangeFunc(e.target.value)}/>
			}
		</div>
	);
}
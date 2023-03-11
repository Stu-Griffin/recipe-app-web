//Icons

//Types
import { ReactElement } from "react";

//Models

//Libraries
import React from "react";

//Functions
import styles from "../../style/reusable/input.module.css";

//Components

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

export default function InputArea({
	type,
	style,
	title,
	value,
	error,
	multiple,
	placeholder,
	onChangeFunc,
}: PropsI): ReactElement {
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

	return (
		<div className={styles.container} style={style}>
			{(title.length !== 0) && <h3 style={getTitleStyle()}>{title}</h3>}
			{
				(multiple)
					?
					<textarea 
						value={value} 
						className={styles.input} 
						placeholder={placeholder} 
						onChange={(e) => onChangeFunc(e.target.value)}
					></textarea>
					:
					<input 
						type={type} 
						value={value} 
						className={styles.input} 
						placeholder={placeholder} 
						onChange={(e) => onChangeFunc(e.target.value)}
					/>
			}
		</div>
	);
}
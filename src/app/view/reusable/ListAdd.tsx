//Components
import InputArea from "../reusable/Input";

//Icons

//Types
import { ReactElement, useEffect } from "react";

//Libraries
import uuid from "react-uuid";
import React, { useState } from "react";

//Functions
import { getButtonStyle } from "../../controller/style";
import styles from "../../style/reusable/list-add.module.css";
import { regularValidation } from "../../controller/validation";

//Models

interface PropsI {
	title: string;
	data: Array<string>;
	placeholder: string;
	saveEl: (value: string) => void;
}

function ListAdd({data, title, placeholder, saveEl}: PropsI): ReactElement {
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<boolean|null>(null);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);

	useEffect(() => {
		setDisabledStatus((error === false) ? false : true);
	}, [error]);

	const action = (e: React.MouseEvent<HTMLElement>): void => {
		e.preventDefault();
		saveEl(value);
		setValue("");
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputArea}>
				<InputArea
					value={value}
					error={false}
					title={title}
					placeholder={placeholder}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setValue(e.target.value);
						setError(regularValidation(e.target.value));
					}}
				/>
				<button
					onClick={action}
					disabled={disabledStatus}
					className={styles.button}
					style={getButtonStyle(disabledStatus)} 
				>Add</button>
			</div>
			<div className={styles.list}>
				{
					data.map((el: string): ReactElement => {
						return (
							<div className={styles.element} key={uuid()}>
								<p className={styles.text}>{el}</p>
								<button className={styles.delete}>delete</button>
							</div>
						);
					})
				}
			</div>
		</div>
	);
}

export default ListAdd;
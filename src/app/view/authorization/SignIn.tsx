//Components
import InputArea from "../reusable/Input";

//Icons

//Types
import { ReactElement, useEffect } from "react";

//Libraries
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useReducer, useState } from "react";

//Functions
import userAPI from "../../controller/api/user";
import styles from "../../style/authorization/sign-in.module.css";
import { emailValidation, regularValidation } from "../../controller/validation";
import { signInUserFormReducer, signInUserErrorFormReducer } from "../../controller/users";

//Models
import { signInUserFormState, signInUserErrorFormState } from "../../model/users";
import { AppDispatch } from "../../types/store";
import { useDispatch } from "react-redux";
import { changeProfileValue } from "../../controller/redux/profile";

export default function SignIn(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [user, userDispatch] = useReducer(signInUserFormReducer, signInUserFormState);
	const [userError, userErrorDispatch] = useReducer(signInUserErrorFormReducer, signInUserErrorFormState);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).every((el: boolean) => el === false)));
	}, [userError]);

	const getButtonStyle = (): object => {
		if(disabledStatus) {
			return {
				opacity: 0.5
			};
		} else {
			return {
				opacity: 1
			};
		}
	};

	const signIn = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		e.preventDefault();
		const response = await userAPI.signIn(user);
		if(response?.data.status === 200) {
			dispatch(changeProfileValue({key: "userId", value: response.data.data}));
			navigate("/");
		} else {
			console.log(response?.data.data);
		}
	};

	return (
		<main className={styles.container}>
			<form className={styles.form}>
				<InputArea
					title={"Email"}
					value={user.email}
					error={userError.email}
					placeholder={"Enter Email"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userDispatch({type: "add", payload: {key: "email", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "email", value: emailValidation(e.target.value)}});
					}}
				/>
				<InputArea
					title={"Password"}
					value={user.password}
					error={userError.password}
					placeholder={"Enter Password"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userDispatch({type: "add", payload: {key: "password", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "password", value: regularValidation(e.target.value)}});
					}}
				/>
				<button
					onClick={signIn}
					style={getButtonStyle()} 
					disabled={disabledStatus}
					className={styles.button}
				>Sign in</button>
			</form>
			<div className={styles.navigationArea}>
				<p>Don’t have an account?</p>
				<Link 
					to="/sign-up/" 
					className={styles.navigation}
				>Sign up</Link>
			</div>
		</main>
	);
}
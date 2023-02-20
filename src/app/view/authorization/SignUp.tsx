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
import styles from "../../style/authorization/sign-up.module.css";
import { emailValidation, regularValidation } from "../../controller/validation";
import { signUpUserFormReducer, signUpUserErrorFormReducer } from "../../controller/users";

//Models
import { signUpUserFormState, signUpUserErrorFormState } from "../../model/users";

export default function SignUp(): ReactElement {
	const navigate = useNavigate();
	const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [user, userDispatch] = useReducer(signUpUserFormReducer, signUpUserFormState);
	const [userError, userErrorDispatch] = useReducer(signUpUserErrorFormReducer, signUpUserErrorFormState);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).every((el: boolean) => el === false) && checkedStatus));
	}, [userError, checkedStatus]);

	const checkBoxClick = (): void => {
		setCheckedStatus((state: boolean) => !state);
	};

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

	const signUp = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		e.preventDefault();
		const response = await userAPI.signUp({
			login: user.login,
			email: user.email,
			password: user.password,
		});
		if(response?.data.status === 200) {
			navigate("/sign-in/");
		} else {
			console.log(response?.data.data);
		}
	};

	return (
		<main className={styles.container}>
			<form className={styles.form}>
				<InputArea
					title={"Login"}
					value={user.login}
					error={userError.login}
					placeholder={"Enter Login"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userDispatch({type: "add", payload: {key: "login", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "login", value: regularValidation(e.target.value)}});
					}}
				/>
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
						userErrorDispatch({type: "add", payload: {key: "confirmPassword", value: !(e.target.value === user.confirmPassword)}});
					}}
				/>
				<InputArea
					title={"Confirm password"}
					value={user.confirmPassword}
					error={userError.confirmPassword}
					placeholder={"Enter Confirm password"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userDispatch({type: "add", payload: {key: "confirmPassword", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "confirmPassword", value: regularValidation(e.target.value) || !(e.target.value == user.password)}});
					}}
				/>
				<div className={styles.agreement}>
					<input 
						id="scales" 
						name="scales" 
						type="checkbox" 
						checked={checkedStatus}
						onChange={checkBoxClick}
						className={styles.checkbox}
					/>
					<label 
						htmlFor="scales" 
						className={styles.checkboxText}
					>Accept terms & Condition</label>
				</div>
				<button
					onClick={signUp}
					style={getButtonStyle()} 
					disabled={disabledStatus}
					className={styles.button}
				>Sign up</button>
			</form>
			<div className={styles.navigationArea}>
				<p>Already a member?</p>
				<Link 
					to="/sign-in/" 
					className={styles.navigation}
				>Sign In</Link>
			</div>
		</main>
	);
}
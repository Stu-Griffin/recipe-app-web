//Components
import Loader from "../reusable/Loader";
import InputArea from "../reusable/Input";

//Icons

//Types
import { ReactElement, useEffect } from "react";
import { AppDispatch } from "../../types/store";

//Libraries
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useReducer, useState } from "react";

//Functions
import userAPI from "../../controller/api/user";
import { getButtonStyle } from "../../controller/style";
import styles from "../../style/authorization/sign-in.module.css";
import { changeProfileValue } from "../../controller/redux/profile";
import { changeAdditionalValue } from "../../controller/redux/additional";
import { emailValidation, regularValidation } from "../../controller/validation";
import { signInUserFormReducer, signInUserErrorFormReducer } from "../../controller/users";

//Models
import { signInUserFormState, signInUserErrorFormState } from "../../model/users";

export default function SignIn(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [user, userDispatch] = useReducer(signInUserFormReducer, signInUserFormState);
	const [userError, userErrorDispatch] = useReducer(signInUserErrorFormReducer, signInUserErrorFormState);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).every((el: boolean) => el === false)));
	}, [userError]);

	const signIn = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		e.preventDefault();
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
	
		const response = await userAPI.signIn(user);
		if(response?.status === 200) {
			dispatch(changeProfileValue({key: "userId", value: response.data}));
			(checkedStatus) && localStorage.setItem("user", response.data);
			navigate("/");
		} else {
			console.log(response?.data);
		}
	
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	return (
		<main className={styles.container}>
			<Loader/>
			<h1>Sign in</h1>
			<form className={styles.form}>
				<InputArea
					title={"Email"}
					value={user.email}
					error={userError.email}
					placeholder={"Enter Email"}
					onChangeFunc={(e: string): void => {
						userDispatch({type: "add", payload: {key: "email", value: e}});
						userErrorDispatch({type: "add", payload: {key: "email", value: emailValidation(e)}});
					}}
				/>
				<InputArea
					type={"password"}
					title={"Password"}
					value={user.password}
					error={userError.password}
					placeholder={"Enter Password"}
					onChangeFunc={(e: string): void => {
						userDispatch({type: "add", payload: {key: "password", value: e}});
						userErrorDispatch({type: "add", payload: {key: "password", value: regularValidation(e)}});
					}}
				/>
				<div className={styles.rememberMe}>
					<input 
						id="scales" 
						name="scales" 
						type="checkbox" 
						checked={checkedStatus}
						className={styles.checkbox}
						onChange={() => setCheckedStatus((state: boolean) => !state)}
					/>
					<label 
						htmlFor="scales" 
						className={styles.checkboxText}
					>Remember me</label>
				</div>
				<button
					onClick={signIn}
					disabled={disabledStatus}
					className={styles.button}
					style={getButtonStyle(disabledStatus)} 
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
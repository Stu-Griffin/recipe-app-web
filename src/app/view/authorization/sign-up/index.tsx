//Icons

//Types
import { ReactElement } from "react";
import { AppDispatch } from "../../../types/store";

//Models
import { signUpUserFormState, signUpUserErrorFormState } from "../../../model/users";

//Libraries
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import React, { useReducer, useState, useEffect } from "react";

//Functions
import userAPI from "../../../controller/api/user";
import { getButtonStyle } from "../../../controller/style";
import styles from "../../../style/authorization/sign-up/index.module.css";
import { changeFlashMessage } from "../../../controller/redux/flashMessage";
import { emailValidation, regularValidation } from "../../../controller/validation";
import { signUpUserFormReducer, signUpUserErrorFormReducer } from "../../../controller/users";

//Components
import Loader from "../../reusable/Loader";
import InputArea from "../../reusable/Input";

export default function SignUp(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [user, userDispatch] = useReducer(signUpUserFormReducer, signUpUserFormState);
	const [userError, userErrorDispatch] = useReducer(signUpUserErrorFormReducer, signUpUserErrorFormState);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).every((el: boolean) => el === false) && checkedStatus));
	}, [userError, checkedStatus]);

	const signUp = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		setLoading(true);
		e.preventDefault();

		const response = await userAPI.signUp(dispatch, { login: user.login, email: user.email, password: user.password });
		if(response?.status === 200) {
			navigate("/sign-in/");
		} else {
			dispatch(changeFlashMessage({
				show: true,
				duration: 5000,
				status: "ERROR",
				description: response?.data,
				message: "Registration error",
			}));
		}

		setLoading(false);
	};

	return (
		<main className={styles.container}>
			<Loader status={loading}/>
			<h1>Sign up</h1>
			<form className={styles.form}>
				<InputArea
					title={"Login"}
					value={user.login}
					error={userError.login}
					placeholder={"Enter Login"}
					onChangeFunc={(e: string): void => {
						userDispatch({type: "add", payload: {key: "login", value: e}});
						userErrorDispatch({type: "add", payload: {key: "login", value: regularValidation(e)}});
					}}
				/>
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
					title={"Password"}
					value={user.password}
					error={userError.password}
					placeholder={"Enter Password"}
					onChangeFunc={(e: string): void => {
						userDispatch({type: "add", payload: {key: "password", value: e}});
						userErrorDispatch({type: "add", payload: {key: "password", value: regularValidation(e)}});
						userErrorDispatch({type: "add", payload: {key: "confirmPassword", value: !(e === user.confirmPassword)}});
					}}
				/>
				<InputArea
					title={"Confirm password"}
					value={user.confirmPassword}
					error={userError.confirmPassword}
					placeholder={"Enter Confirm password"}
					onChangeFunc={(e: string): void => {
						userDispatch({type: "add", payload: {key: "confirmPassword", value: e}});
						userErrorDispatch({type: "add", payload: {key: "confirmPassword", value: regularValidation(e) || !(e == user.password)}});
					}}
				/>
				<div className={styles.agreement}>
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
					>Accept terms & Condition</label>
				</div>
				<button
					onClick={signUp}
					disabled={disabledStatus}
					className={styles.button}
					style={getButtonStyle(disabledStatus)} 
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
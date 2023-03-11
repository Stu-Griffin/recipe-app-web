//Icons

//Types
import { ReactElement } from "react";
import { AppDispatch } from "../../../types/store";

//Models
import { signInUserFormState, signInUserErrorFormState } from "../../../model/users";

//Libraries
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import React, { useReducer, useState, useEffect } from "react";

//Functions
import userAPI from "../../../controller/api/user";
import { getButtonStyle } from "../../../controller/style";
import { changeProfileValue } from "../../../controller/redux/profile";
import styles from "../../../style/authorization/sign-in/index.module.css";
import { changeFlashMessage } from "../../../controller/redux/flashMessage";
import { emailValidation, regularValidation } from "../../../controller/validation";
import { signInUserFormReducer, signInUserErrorFormReducer } from "../../../controller/users";

//Components
import Loader from "../../reusable/Loader";
import InputArea from "../../reusable/Input";

export default function SignIn(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const [checkedStatus, setCheckedStatus] = useState<boolean>(false);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [user, userDispatch] = useReducer(signInUserFormReducer, signInUserFormState);
	const [userError, userErrorDispatch] = useReducer(signInUserErrorFormReducer, signInUserErrorFormState);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).every((el: boolean) => el === false)));
	}, [userError]);

	const signIn = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		setLoading(true);

		e.preventDefault();
		const response = await userAPI.signIn(dispatch, user);
		if(response?.status === 200 && response?.data) {
			dispatch(changeProfileValue({key: "userId", value: response.data}));
			(checkedStatus) && localStorage.setItem("user", response.data);
			navigate("/");
		} else {
			dispatch(changeFlashMessage({
				show: true,
				duration: 3000,
				status: "ERROR",
				description: response?.data,
				message: "Authorization error",
			}));
		}
	
		setLoading(false);
	};

	return (
		<main className={styles.container}>
			<Loader status={loading}/>
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
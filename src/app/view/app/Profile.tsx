//Components
import Loader from "../reusable/Loader";
import InputArea from "../reusable/Input";
import RecipesList from "../reusable/RecipeList";

//Icons
import ExitIcon from "../../../assets/icons/exit";
import DefaultAvatar from "../../../assets/icons/avatar";
import DeleteProfileIcon from "../../../assets/icons/deleteProfile";

//Types
import { RecipeI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { ImageListType } from "react-images-uploading";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useReducer, useState } from "react";

//Functions
import userAPI from "../../controller/api/user";
import recipeAPI from "../../controller/api/recipes";
import styles from "../../style/app/profile.module.css";
import { getButtonStyle } from "../../controller/style";
import { changeAdditionalValue } from "../../controller/redux/additional";
import { regularValidation, emailValidation } from "../../controller/validation";
import { profileFormReducer, profileErrorFormReducer } from "../../controller/profile";
import { changeProfileValue, changeUserProfileValue } from "../../controller/redux/profile";

//Models
import { profileFormState, profileErrorFormState } from "../../model/profile";

const allowedImgTypes = ["jpg", "png", "jpeg"];

export default function Profile() {
	const maxNumber = 69;
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [avatar, setAvatar] = useState<string>("");
	const [recipes, setRecipes] = useState<Array<RecipeI>>([]);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [userForm, userFormDispatch] = useReducer(profileFormReducer, profileFormState);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const [userError, userErrorDispatch] = useReducer(profileErrorFormReducer, profileErrorFormState);

	useEffect(() => {
		setAvatar(user.avatar);
	}, [user]);

	useEffect(() => {
		if(userId === "") {
			const user = localStorage.getItem("user");
			(user) ? dispatch(changeProfileValue({key: "userId", value: user})) : navigate("/sign-in/");
		} else {
			getUsersRecipes();
		}
	}, [userId]);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).some((el: boolean) => el === false)));
	}, [userError]);

	const exit = (): void => {
		navigate("/sign-in/");
		localStorage.removeItem("user");
	};

	const convertData = (): FormData => {
		const data: FormData = new FormData();

		userForm.avatar && data.append("avatar", userForm.avatar);
		userForm.avatar && data.append("avatarId", user.avatarId);
		userForm.login.length > 0 && data.append("login", userForm.login);
		userForm.email.length > 0 && data.append("email", userForm.email);
		userForm.password.length > 0 && data.append("password", userForm.password);

		return data;
	};

	const deleteProfile = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));

		const response = await userAPI.deleteUser(userId, user.avatarId);
		if(response?.status === 200) exit();
		console.log(response?.data);
		
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	const getUsersRecipes = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));

		const response = await recipeAPI.getRecipeByAuthorId(userId);
		if(response?.status === 200) setRecipes(response?.data);
		
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	const changeAvatar = (imageList: ImageListType): void => {
		const file = imageList[0].file;
		if(allowedImgTypes.some((el: string) => el === file?.type.split("/")[1])) {
			setAvatar(imageList[0].data_url);
			userFormDispatch({type: "add", payload: {key: "avatar", value: file}});
			userErrorDispatch({type: "add", payload: {key: "avatar", value: false}});
		} else {
			alert(`Avatar image should be in ${allowedImgTypes} format`);
		}
	};

	const saveChanges = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));

		e.preventDefault();
		const response = await userAPI.changeUser(userId, convertData());
		if(response?.status === 200) {
			userForm.avatar && dispatch(changeUserProfileValue({key: "avatar", value: avatar}));
			(response.avatarId) && dispatch(changeUserProfileValue({key: "avatarId", value: response.avatarId}));
			userForm.login.length > 0 && dispatch(changeUserProfileValue({key: "login", value: userForm.login}));
		} 
		console.log(response?.data);
		userFormDispatch({type: "clear", payload: {key: "", value: null}});
		userErrorDispatch({type: "clear", payload: {key: "", value: null}});

		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};
	
	return (
		<main className={styles.container}>
			<Loader/>
			<div className={styles.profileActionArea}>
				<DeleteProfileIcon 
					width={40} 
					height={40} 
					onClick={deleteProfile}
					className={styles.profileActionIcon} 
				/>
				<ExitIcon 
					width={40} 
					height={40} 
					onClick={exit}
					className={styles.profileActionIcon}
				/>
			</div>
			<form className={styles.form}>
				<div>
					<ImageUploading
						multiple
						value={[]}
						dataURLKey="data_url"
						maxNumber={maxNumber}
						onChange={changeAvatar}
					>
						{({ onImageUpload }) => (
							(avatar) 
								?
								(avatar === "")
									?
									<Loader/>
									:
									<img 
										style={{
											width: "122px",
											height: "122px",
											cursor: "pointer",
											borderRadius: "100px",
											border: "1px solid black",
										}}
										src={avatar}
										alt="user avatar"
										onClick={onImageUpload}
									/>
								:
								<DefaultAvatar
									style={{
										width: "122px",
										height: "122px",
										cursor: "pointer",
										borderRadius: "100px",
										border: "1px solid black",
									}}
									onClick={onImageUpload}
								/>
						)}
					</ImageUploading>
				</div>
				<InputArea
					error={false}
					title={"Login"}
					value={userForm.login}
					placeholder={"Enter Login"}
					onChangeFunc={(e: string): void => {
						userFormDispatch({type: "add", payload: {key: "login", value: e}});
						userErrorDispatch({type: "add", payload: {key: "login", value: regularValidation(e)}});
					}}
				/>
				<InputArea
					error={false}
					title={"Email"}
					value={userForm.email}
					placeholder={"Enter Email"}
					onChangeFunc={(e: string): void => {
						userFormDispatch({type: "add", payload: {key: "email", value: e}});
						userErrorDispatch({type: "add", payload: {key: "email", value: emailValidation(e)}});
					}}
				/>
				<InputArea
					error={false}
					title={"Password"}
					value={userForm.password}
					placeholder={"Enter Password"}
					onChangeFunc={(e: string): void => {
						userFormDispatch({type: "add", payload: {key: "password", value: e}});
						userErrorDispatch({type: "add", payload: {key: "password", value: regularValidation(e)}});
					}}
				/>
				<button
					onClick={saveChanges}
					disabled={disabledStatus}
					className={styles.button}
					style={getButtonStyle(disabledStatus)} 
				>Save changes</button>
			</form>
			<RecipesList
				data={recipes}
				title="Your recipes"
				deleteAbility={false}
				length={recipes.length}
				emptyMsg="You didn't create any recipes"
			/>
		</main>
	);
}
//Icons
import ExitIcon from "../../../../assets/icons/exit";
import DefaultAvatar from "../../../../assets/icons/avatar";
import DeleteProfileIcon from "../../../../assets/icons/deleteProfile";

//Types
import { RecipeI } from "../../../types/recipes";
import { ProfileStateI } from "../../../types/profile";
import { ImageListType } from "react-images-uploading";
import { AppDispatch, RootState } from "../../../types/store";

//Models
import { profileFormState, profileErrorFormState } from "../../../model/profile";

//Libraries
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useReducer, useState } from "react";

//Functions
import userAPI from "../../../controller/api/user";
import recipeAPI from "../../../controller/api/recipes";
import { getButtonStyle } from "../../../controller/style";
import styles from "../../../style/app/profile/index.module.css";
import { changeFlashMessage } from "../../../controller/redux/flashMessage";
import { regularValidation, emailValidation } from "../../../controller/validation";
import { profileFormReducer, profileErrorFormReducer } from "../../../controller/profile";
import { changeProfileValue, changeUserProfileValue } from "../../../controller/redux/profile";

//Components
import Loader from "../../reusable/Loader";
import InputArea from "../../reusable/Input";
import RecipesList from "../../reusable/RecipeList";

const allowedImgTypes = ["jpg", "png", "jpeg"];

export default function Profile(): ReactElement {
	const maxNumber = 69;
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [avatar, setAvatar] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [recipes, setRecipes] = useState<Array<RecipeI>>([]);
	const [listLoading, setListLoading] = useState<boolean>(true);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [userForm, userFormDispatch] = useReducer(profileFormReducer, profileFormState);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const [userError, userErrorDispatch] = useReducer(profileErrorFormReducer, profileErrorFormState);

	useEffect(() => {
		if(userId === "") {
			const user = localStorage.getItem("user");
			(user) ? dispatch(changeProfileValue({key: "userId", value: user})) : navigate("/sign-in/");
		} else {
			getUsersRecipes();
		}
	}, [userId, user.login]);

	useEffect(() => {
		setAvatar(user.avatar);
	}, [user]);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).some((el: boolean) => el === false)));
	}, [userError]);

	const exit = (): void => {
		navigate("/sign-in/");
		localStorage.removeItem("user");
		dispatch(changeProfileValue({key: "user", value: {
			login: "",
			avatar: "",
			avatarId: "",
			savedRecipes: [],
		}}));
		dispatch(changeProfileValue({key: "userId", value: ""}));
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

	async function getUsersRecipes(): Promise<void> {
		setListLoading(true);

		const response = await recipeAPI.getRecipesByAuthorId(dispatch, userId);
		if(response?.status === 200) setRecipes(response?.data);
		
		setListLoading(false);
	}

	const deleteProfile = async (): Promise<void> => {
		setLoading(true);

		const response = await userAPI.deleteUser(dispatch, userId, user.avatarId);
		if(response?.status === 200) exit();
		dispatch(changeFlashMessage({
			show: true,
			duration: 3000,
			description: response?.data,
			message: "Delete user profile",
			status: (response?.status === 200) ? "SUCCESS" : "ERROR", 
		}));
		
		setLoading(false);
	};

	const changeAvatar = (imageList: ImageListType): void => {
		const file = imageList[0].file;
		if(allowedImgTypes.some((el: string) => el === file?.type.split("/")[1])) {
			setAvatar(imageList[0].data_url);
			userFormDispatch({type: "add", payload: {key: "avatar", value: file}});
			userErrorDispatch({type: "add", payload: {key: "avatar", value: false}});
		} else {
			dispatch(changeFlashMessage({
				show: true,
				status: "WARN",
				duration: 4000,
				message: "Pick avatar image",
				description: `Avatar image should be in ${allowedImgTypes} format`,
			}));
		}
	};

	const saveChanges = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		setLoading(true);

		e.preventDefault();
		const response = await userAPI.changeUser(dispatch, userId, convertData());
		if(response?.status === 200) {
			userForm.avatar && dispatch(changeUserProfileValue({key: "avatar", value: avatar}));
			(response.avatarId) && dispatch(changeUserProfileValue({key: "avatarId", value: response.avatarId}));
			userForm.login.length > 0 && dispatch(changeUserProfileValue({key: "login", value: userForm.login}));
		} 
		dispatch(changeFlashMessage({
			show: true,
			duration: 4000,
			description: response?.data,
			message: "User profile update",
			status: (response?.status === 200) ? "SUCCESS" : "ERROR", 
		}));
		userFormDispatch({type: "clear", payload: {key: "", value: null}});
		userErrorDispatch({type: "clear", payload: {key: "", value: null}});

		setLoading(false);
	};
	
	return (
		<main className={styles.container}>
			<Loader status={loading}/>
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
				loadingStatus={listLoading}
				emptyMsg="You didn't create any recipes"
			/>
		</main>
	);
}
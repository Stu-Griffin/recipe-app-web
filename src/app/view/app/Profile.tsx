//Components
import InputArea from "../reusable/Input";
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { RecipesStateI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { ImageListType } from "react-images-uploading";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import React, { useEffect, useReducer, useState } from "react";

//Functions
import recipeAPI from "../../controller/api/recepies";
import { changeRecipesValue } from "../../controller/redux/recipes";
import { regularValidation, emailValidation } from "../../controller/validation";
import { profileFormReducer, profileErrorFormReducer } from "../../controller/profile";

//Models
import { profileFormState, profileErrorFormState } from "../../model/profile";

const allowedImgTypes = ["jpg", "png", "jpeg"];

function Profile() {
	const maxNumber = 69;
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [avatar, setAvatar] = useState<string>("");
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [userForm, userFormDispatch] = useReducer(profileFormReducer, profileFormState);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const { usersRecipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);
	const [userError, userErrorDispatch] = useReducer(profileErrorFormReducer, profileErrorFormState);

	useEffect(() => {
		setAvatar(user.avatar);
	}, [user]);

	useEffect(() => {
		if(userId === "") {
			navigate("/sign-in/");
		} else {
			getUsersRecipes();
		}
	}, [userId]);

	useEffect(() => {
		setDisabledStatus(!(Object.values(userError).some((el: boolean) => el === false)));
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

	const getUsersRecipes = async (): Promise<void> => {
		const response = await recipeAPI.getRecipeByAuthorId(userId);
		if(response?.status === 200) {
			dispatch(changeRecipesValue({key: "usersRecipes", value: response.data}));
		}
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

	const signUp = (e: React.MouseEvent<HTMLElement>): void => {
		e.preventDefault();
		const data: FormData = new FormData();
		userForm.avatar && data.append("avatar", userForm.avatar);
		userForm.login.length > 0 && data.append("login", userForm.login);
		userForm.email.length > 0 && data.append("email", userForm.email);
		userForm.password.length > 0 && data.append("password", userForm.password);
	};

	return (
		<section>
			<form>
				<div>
					<ImageUploading
						multiple
						value={[]}
						dataURLKey="data_url"
						maxNumber={maxNumber}
						onChange={changeAvatar}
					>
						{({ onImageUpload }) => (
							<img 
								src={avatar}
								alt="user avatar"
								onClick={onImageUpload}
								style={{
									width: "122px",
									height: "122px",
									cursor: "pointer",
									borderRadius: "100px",
									border: "1px solid black",
								}}
							/>
						)}
					</ImageUploading>
				</div>
				<InputArea
					error={false}
					title={"Login"}
					value={userForm.login}
					placeholder={"Enter Login"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userFormDispatch({type: "add", payload: {key: "login", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "login", value: regularValidation(e.target.value)}});
					}}
				/>
				<InputArea
					error={false}
					title={"Email"}
					value={userForm.email}
					placeholder={"Enter Email"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userFormDispatch({type: "add", payload: {key: "email", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "email", value: emailValidation(e.target.value)}});
					}}
				/>
				<InputArea
					error={false}
					title={"Password"}
					value={userForm.password}
					placeholder={"Enter Password"}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						userFormDispatch({type: "add", payload: {key: "password", value: e.target.value}});
						userErrorDispatch({type: "add", payload: {key: "password", value: regularValidation(e.target.value)}});
					}}
				/>
				<button
					onClick={signUp}
					style={getButtonStyle()} 
					disabled={disabledStatus}
				>Save changes</button>
			</form>
			<RecipesList
				data={usersRecipes}
				length={usersRecipes.length}
				emptyMsg="You didn't create any recipes"
			/>
		</section>
	);
}

export default Profile;
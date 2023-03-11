//Icons

//Types
import { ReactElement } from "react";
import { AppDispatch, RootState } from "../../types/store";
import { ProfileStateI, ProfileUserI } from "../../types/profile";

//Models

//Libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Functions
import userApi from "../../controller/api/user";
import { changeProfileValue } from "../../controller/redux/profile";

//Components
import Header from "./Header";
import Main from "../app/main";
import Profile from "../app/profile";
import RecipePage from "../app/recipe-page";
import SignIn from "../authorization/sign-in";
import SignUp from "../authorization/sign-up";
import SavedRecipes from "../app/saved-recipes";
import CreateRecipe from "../app/create-edit-recipe";

export default function Navigation(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		if(userId !== "") {
			getUserInfo();
		} else {
			const user = localStorage.getItem("user");
			if(user) dispatch(changeProfileValue({key: "userId", value: user}));
		}
	}, [userId]);

	async function getUserInfo(): Promise<void> {
		const response = await userApi.getUser(dispatch, userId);
		if(response?.status === 200 && response?.data) {
			const profile: ProfileUserI = {
				login: response.data.login, 
				avatar: response.data.avatar, 
				avatarId: response.data.avatarId,
				savedRecipes: response.data.savedRecipes,
			};
			dispatch(changeProfileValue({key: "user", value: profile}));
		} else {
			localStorage.removeItem("user");
			dispatch(changeProfileValue({key: "userId", value: ""}));
		}
	}

	return (
		<Router>
			<Header/>
			<Routes>
				<Route path="/" element={<Main/>}/>
				<Route path="/sign-in" element={<SignIn/>}/>
				<Route path="/sign-up" element={<SignUp/>}/>
				<Route path="/profile" element={<Profile/>}/>
				<Route path="/saved-recipes" element={<SavedRecipes/>}/>
				<Route path="/create-recipe" element={<CreateRecipe/>}/>
				<Route path="/recipe/:recipeId" element={<RecipePage/>}/>
				<Route path="/edit-recipe/:recipeId" element={<CreateRecipe/>}/>
			</Routes>
		</Router>
	);
}
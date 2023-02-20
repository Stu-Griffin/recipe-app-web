//Components
import Main from "./app/Main";
import Profile from "./app/Profile";
import RecipePage from "./app/RecipePage";
import SignIn from "./authorization/SignIn";
import SignUp from "./authorization/SignUp";
import CreateRecipe from "./app/CreateRecipe";
import SavedRecipes from "./app/SavedRecipes";

//Icons
import SavedIcon from "../../assets/icons/saved";
import ProfileIcon from "../../assets/icons/profile";

//Types
import { ReactElement } from "react";
import { ProfileStateI } from "../types/profile";
import { AppDispatch, RootState } from "../types/store";

//Libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Functions
import userApi from "../controller/api/user";
import styles from "../style/navigation.module.css";
import { changeProfileValue } from "../controller/redux/profile";

//Models

function Navigation(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		(userId !== "") && getUserInfo();
	}, [userId]);

	const getInfoPart = (): ReactElement => {
		if(Object.values(user).every((el: string) => el.length !== 0)) {
			return (
				<div>
					<h2>Hello {user.login}</h2>
					<h3>What are you cooking today?</h3>
				</div>
			);
		} else {
			return (
				<h1>Cook well</h1>
			);
		}
	};

	const getUserInfo = async (): Promise<void> => {
		const response = await userApi.getUser(userId);
		if(response.status === 200) {
			dispatch(changeProfileValue({key: "user", value: {login: response.data.login, avatar: response.data.avatar}}));
		}
	};

	return (
		<Router>
			<header className={styles.header}>
				<Link to="/">
					{getInfoPart()}
				</Link>
				<nav className={styles.nav}>
					<Link to="/profile/">
						<ProfileIcon width={30} height={30}/>
					</Link>
					<Link to="/saved-recipes/">
						<SavedIcon  width={30} height={30}/>
					</Link>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<Main/>} />
				<Route path="/sign-in/" element={<SignIn/>} />
				<Route path="/sign-up/" element={<SignUp/>} />
				<Route path="/profile/" element={<Profile/>} />
				<Route path="/create-recipe/" element={<CreateRecipe/>} />
				<Route path="/saved-recipes/" element={<SavedRecipes/>} />
				<Route path="/recipe/:recipeId" element={<RecipePage/>} />
			</Routes>
		</Router>
	);
}

export default Navigation;
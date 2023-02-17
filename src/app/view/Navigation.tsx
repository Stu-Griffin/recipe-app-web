//Components
import Main from "./app/Main";
import Profile from "./app/Profile";
import SignIn from "./authorization/SignIn";
import SignUp from "./authorization/SignUp";
import SavedRecipes from "./app/SavedRecipes";

//Icons

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
import { changeProfileValue } from "../controller/redux/profile";

//Models

function Navigation(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		(userId !== "") && getUserInfo();
	}, [userId]);

	const getUserInfo = async (): Promise<void> => {
		const response = await userApi.getUser(userId);
		if(response.status === 200) {
			dispatch(changeProfileValue({key: "user", value: {login: response.data.login, avatar: response.data.avatar}}));
		}
	};

	return (
		<Router>
			<header>
				<div className="info-part">
					<Link to="/">
						<img src={user.avatar} className="avatar" alt="User avatar"/>
					</Link>
					{
						(Object.values(user).every((el: string) => el.length !== 0)) &&
						<div className="welcome-text">
							<h2>Hello {user.login}</h2>
							<h3>What are you cooking today?</h3>
						</div>
					}
				</div>
				<nav>
					<Link to="/" className="navigation-button">Home</Link>
					<Link to="/profile/" className="navigation-button">Profile</Link>
					<Link to="/saved-recipes/" className="navigation-button">Saved recipes</Link>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<Main/>} />
				<Route path="/sign-in/" element={<SignIn/>} />
				<Route path="/sign-up/" element={<SignUp/>} />
				<Route path="/profile/" element={<Profile/>} />
				<Route path="/saved-recipes/" element={<SavedRecipes/>} />
			</Routes>
		</Router>
	);
}

export default Navigation;
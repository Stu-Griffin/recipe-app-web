//Components
import Main from "./app/Main";
import Profile from "./app/Profile";
import SignIn from "./authorization/SignIn";
import SignUp from "./authorization/SignUp";
import SavedRecipes from "./app/SavedRecipes";

//Icons

//Types
import { ReactElement } from "react";

//Libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Functions

//Models

function Navigation(): ReactElement {
	return (
		<Router>
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
//Components
import Main from "./app/Main";
import Profile from "./app/Profile";
import SignIn from "./authorization/SignIn";
import SignUp from "./authorization/SignUp";
import SavedRecipes from "./app/SavedRecipes";

//Icons
import logo from "../../assets/icons/logo.svg";

//Types
import { ReactElement } from "react";

//Libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Functions

//Models

function Navigation(): ReactElement {
	return (
		<Router>
			<header>
				<img src={logo} className="logo" alt="App logo"/>
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
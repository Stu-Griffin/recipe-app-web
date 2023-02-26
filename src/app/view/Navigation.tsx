//Components
import Main from "./app/Main";
import Profile from "./app/Profile";
import RecipePage from "./app/RecipePage";
import SignIn from "./authorization/SignIn";
import SignUp from "./authorization/SignUp";
import CreateRecipe from "./app/CreateRecipe";
import SavedRecipes from "./app/SavedRecipes";

//Icons
import AddIcon from "../../assets/icons/add";
import MenuIcon from "../../assets/icons/menu";
import CrossIcon from "../../assets/icons/cross";
import SavedIcon from "../../assets/icons/saved";
import ProfileIcon from "../../assets/icons/profile";

//Types
import { ReactElement } from "react";
import { ProfileStateI } from "../types/profile";
import { AppDispatch, RootState } from "../types/store";

//Libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Functions
import userApi from "../controller/api/user";
import styles from "../style/navigation.module.css";
import { changeProfileValue } from "../controller/redux/profile";
import { RecipesStateI } from "../types/recipes";

//Models

export default function Navigation(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
	const { savedRecipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		if(userId !== "") {
			getUserInfo();
		} else {
			const user = localStorage.getItem("user");
			if(user) dispatch(changeProfileValue({key: "userId", value: user}));
		}
	}, [userId]);

	useEffect(() => {
		localStorage.setItem("saved-recipes", JSON.stringify(savedRecipes));
	}, [savedRecipes]);

	const toggle = (): void => {
		setMenuIsOpen(!menuIsOpen);
	};

	const menuStyle = (): object => {
		if(menuIsOpen) {
			return {
				display: "flex",
			};
		} else {
			return {
				display: "none",
			};
		}
	};

	const getInfoPart = (): ReactElement => {
		if(Object.values(user).every((el: string) => el.length !== 0)) {
			return (
				<div>
					<h3>Hello {user.login}</h3>
					<h4>What are you cooking today?</h4>
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
		if(response?.status === 200 && response?.data) dispatch(changeProfileValue({key: "user", value: {login: response?.data.login, avatar: response?.data.avatar}}));
	};

	const getMenuIcon = (): ReactElement => {
		if(menuIsOpen) {
			return <CrossIcon onClick={toggle} style={{cursor: "pointer"}} width={30} height={30}/>;
		} else {
			return <MenuIcon onClick={toggle} style={{cursor: "pointer"}} width={30} height={30}/>;
		}
	};

	return (
		<Router>
			<header className={styles.header}>
				<Link to="/" onClick={() => setMenuIsOpen(false)}>
					{getInfoPart()}
				</Link>
				{getMenuIcon()}
			</header>
			<nav className={styles.navigation} style={menuStyle()}>
				{
					(userId !== "") &&
						<Link to="/create-recipe/">
							<AddIcon width={30} height={30}/>
						</Link>
				}
				<Link to="/saved-recipes/">
					<SavedIcon width={30} height={30} fill="transparent"/>
				</Link>
				<Link to="/profile/">
					<ProfileIcon width={30} height={30}/>
				</Link>
			</nav>
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
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
import { AppDispatch, RootState } from "../types/store";
import { ProfileStateI, ProfileUserI } from "../types/profile";

//Libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Functions
import userApi from "../controller/api/user";
import styles from "../style/navigation.module.css";
import { changeProfileValue } from "../controller/redux/profile";

//Models

export default function Navigation(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		if(userId !== "") {
			getUserInfo();
		} else {
			const user = localStorage.getItem("user");
			if(user) dispatch(changeProfileValue({key: "userId", value: user}));
		}
	}, [userId]);

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

	const getMenuIcon = (): ReactElement => {
		if(menuIsOpen) {
			return <CrossIcon 
				width={30} 
				height={30}
				onClick={toggle} 
				style={{cursor: "pointer"}} 
			/>;
		} else {
			return <MenuIcon
				width={30} 
				height={30}
				onClick={toggle} 
				style={{cursor: "pointer"}}
			/>;
		}
	};

	const getInfoPart = (): ReactElement => {
		if(Object.values(user).some((el: string|string[]) => {
			if(el) {
				return el.length !== 0;
			} else {
				return false;
			}
		})) {
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
			<header className={styles.header}>
				<Link 
					to="/" 
					onClick={() => setMenuIsOpen(false)}
				>
					{getInfoPart()}
				</Link>
				{getMenuIcon()}
			</header>
			<nav
				style={menuStyle()} 
				className={styles.navigation}
			>
				{
					(userId !== "") &&
						<Link 
							to="/create-recipe/"
							onClick={() => setMenuIsOpen(false)}
						>
							<AddIcon 
								width={30} 
								height={30}
							/>
						</Link>
				}
				<Link 
					to="/saved-recipes/" 
					onClick={() => setMenuIsOpen(false)}
				>
					<SavedIcon 
						width={30} 
						height={30} 
						fill="transparent"
					/>
				</Link>
				<Link 
					to="/profile/" 
					onClick={() => setMenuIsOpen(false)}
				>
					<ProfileIcon 
						width={30} 
						height={30}
					/>
				</Link>
			</nav>
			<Routes>
				<Route 
					path="/" 
					element={<Main/>} 
				/>
				<Route 
					path="/sign-in/" 
					element={<SignIn/>} 
				/>
				<Route 
					path="/sign-up/" 
					element={<SignUp/>} 
				/>
				<Route 
					path="/profile/" 
					element={<Profile/>} 
				/>
				<Route 
					element={<RecipePage/>} 
					path="/recipe/:recipeId" 
				/>
				<Route 
					path="/create-recipe/" 
					element={<CreateRecipe/>} 
				/>
				<Route 
					element={<CreateRecipe/>} 
					path="/edit-recipe/:recipeId" 
				/>
				<Route 
					path="/saved-recipes/" 
					element={<SavedRecipes/>} 
				/>
			</Routes>
		</Router>
	);
}
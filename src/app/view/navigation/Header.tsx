//Icons
import AddIcon from "../../../assets/icons/add";
import MenuIcon from "../../../assets/icons/menu";
import CrossIcon from "../../../assets/icons/cross";
import SavedIcon from "../../../assets/icons/saved";
import ProfileIcon from "../../../assets/icons/profile";

//Types
import { ReactElement } from "react";
import { RootState } from "../../types/store";
import { ProfileStateI } from "../../types/profile";

//Models

//Libraries
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";

//Functions
import styles from "../../style/navigation/header.module.css";

//Components

export default function Header() {
	const nodeRef = useRef(null);
	const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	const toggle = (): void => {
		setMenuIsOpen(!menuIsOpen);
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

	return (
		<>
			<header className={styles.header}>
				<Link 
					to="/" 
					onClick={() => setMenuIsOpen(false)}
				>
					{getInfoPart()}
				</Link>
				{getMenuIcon()}
			</header>
			<CSSTransition
				timeout={750}
				unmountOnExit
				in={menuIsOpen}
				nodeRef={nodeRef}
				classNames="menu"
			>
				<nav
					ref={nodeRef}
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
			</CSSTransition>
		</>
	);
}
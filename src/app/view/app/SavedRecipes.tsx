//Components

//Icons

//Types
import { RootState } from "../../types/store";
import { ProfileStateI } from "../../types/profile";

//Libraries
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Functions

//Models

function SavedRecipes() {
	const navigate = useNavigate();
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		if(userId === "") {
			navigate("/sign-in/");
		}
	}, [userId]);

	return (
		<h1>SavedRecipes</h1>
	);
}

export default SavedRecipes;
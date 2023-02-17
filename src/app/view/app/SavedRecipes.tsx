//Components
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { ProfileStateI } from "../../types/profile";
import { RecipesStateI } from "../../types/recipes";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Functions
import { changeRecipesValue } from "../../controller/redux/recipes";

//Models

function SavedRecipes() {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const { savedRecipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);

	useEffect(() => {
		if(userId === "") {
			navigate("/sign-in/");
		} else {
			getSavedRecipes();
		}
	}, [userId]);

	const getSavedRecipes = (): void => {
		const recipes = sessionStorage.getItem("saved-recipes");
		if(recipes) {
			dispatch(changeRecipesValue({key: "savedRecipes", value: recipes}));
		}
	};

	return (
		<RecipesList
			data={savedRecipes}
			length={savedRecipes.length}
			emptyMsg="You didn't save any recipes"
		/>
	);
}

export default SavedRecipes;
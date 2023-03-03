//Components
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { RecipesStateI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import { useNavigate } from "react-router-dom";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Functions
import styles from "../../style/app/saved-recipes.module.css";
import { changeRecipeValue } from "../../controller/redux/recipes";
import { changeProfileValue } from "../../controller/redux/profile";
import { changeAdditionalValue } from "../../controller/redux/additional";

//Models

export default function SavedRecipes(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const { savedRecipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);

	useEffect(() => {
		if(userId === "") {
			const user = localStorage.getItem("user");
			(user) ? dispatch(changeProfileValue({key: "userId", value: user})) : navigate("/sign-in/");
		} else {
			getSavedRecipes();
		}
	}, [userId]);

	const getSavedRecipes = (): void => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		
		const recipes = localStorage.getItem("saved-recipes");
		if(recipes) dispatch(changeRecipeValue({key: "savedRecipes", value: JSON.parse(recipes)}));
		
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	return (
		<main className={styles.container}>
			<RecipesList
				data={savedRecipes}
				deleteAbility={true}
				title="Saved recipes"
				length={savedRecipes.length}
				emptyMsg="You didn't save any recipes"
			/>
		</main>
	);
}
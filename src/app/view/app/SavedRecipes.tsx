//Components
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { SavedRecipeI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Functions
import styles from "../../style/app/saved-recipes.module.css";
import { changeProfileValue } from "../../controller/redux/profile";
import { changeAdditionalValue } from "../../controller/redux/additional";

//Models

export default function SavedRecipes(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [recipes, setRecipes] = useState<Array<SavedRecipeI>>([]);
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		if(userId === "") {
			const user = localStorage.getItem("user");
			if(user) {
				dispatch(changeProfileValue({key: "userId", value: user}));
			} else {
				navigate("/sign-in/");
			}
		} else {
			getSavedRecipes();
		}
	}, [userId]);

	const getSavedRecipes = (): void => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		const recipes = localStorage.getItem("saved-recipes");
		if(recipes) setRecipes(JSON.parse(recipes));
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	return (
		<main className={styles.container}>
			<RecipesList
				data={recipes}
				length={recipes.length}
				emptyMsg="You didn't save any recipes"
			/>
		</main>
	);
}
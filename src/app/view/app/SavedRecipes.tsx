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
import { changeAdditionalValue } from "../../controller/redux/addtional";

//Models

export default function SavedRecipes(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const [recipes, setRecipes] = useState<Array<SavedRecipeI>>([]);

	useEffect(() => {
		(userId === "") ? navigate("/sign-in/") : getSavedRecipes();
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
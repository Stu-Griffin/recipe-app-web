//Icons

//Types
import { ReactElement } from "react";
import { RecipeI } from "../../../types/recipes";
import { ProfileStateI } from "../../../types/profile";
import { AppDispatch, RootState } from "../../../types/store";

//Models

//Libraries
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";

//Functions
import recipeAPI from "../../../controller/api/recipes";
import styles from "../../../style/app/saved-recipes/index.module.css";
import { changeProfileValue } from "../../../controller/redux/profile";

//Components
import RecipesList from "../../reusable/RecipeList";

export default function SavedRecipes(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(true);
	const [recipes, setRecipes] = useState<RecipeI[]>([]);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useMemo(() => {
		getSavedRecipes();
	}, [user.savedRecipes]);

	useEffect(() => {
		if(userId === "") {
			const user = localStorage.getItem("user");
			(user) ? dispatch(changeProfileValue({key: "userId", value: user})) : navigate("/sign-in/");
		}
	}, [userId]);

	async function getSavedRecipes(): Promise<void> {
		setLoading(true);
		
		const response = await recipeAPI.getSavedRecipes(dispatch, user.savedRecipes);
		if(response?.status === 200 && response?.data) setRecipes(response.data);
		
		setLoading(false);
	}

	return (
		<main className={styles.container}>
			<RecipesList
				data={recipes}
				deleteAbility={true}
				title="Saved recipes"
				loadingStatus={loading}
				length={recipes.length}
				emptyMsg="You didn't save any recipes"
			/>
		</main>
	);
}
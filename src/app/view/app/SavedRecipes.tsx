//Components
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { RecipeI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import { useNavigate } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Functions
import recipeAPI from "../../controller/api/recipes";
import styles from "../../style/app/saved-recipes.module.css";
import { changeProfileValue } from "../../controller/redux/profile";
import { changeAdditionalValue } from "../../controller/redux/additional";

//Models

export default function SavedRecipes(): ReactElement {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [recipes, setRecipes] = useState<RecipeI[]>([]);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);

	useEffect(() => {
		if(userId === "") {
			const user = localStorage.getItem("user");
			(user) ? dispatch(changeProfileValue({key: "userId", value: user})) : navigate("/sign-in/");
		}
	}, [userId]);

	useEffect(() => {
		getSavedRecipes();
	}, [user.savedRecipes]);

	const getSavedRecipes = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		
		const response = await recipeAPI.getSavedRecipes(user.savedRecipes);
		if(response?.status === 200 && response?.data) setRecipes(response.data);
		console.log(response);
		
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	return (
		<main className={styles.container}>
			<RecipesList
				data={recipes}
				deleteAbility={true}
				title="Saved recipes"
				length={recipes.length}
				emptyMsg="You didn't save any recipes"
			/>
		</main>
	);
}
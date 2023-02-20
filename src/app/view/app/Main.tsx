//Components
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { RecipesStateI } from "../../types/recipes";
import { AdittionalStateI } from "../../types/additional";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Functions
import styles from "../../style/app/main.module.css";
import recipeAPI from "../../controller/api/recepies";
import { changeRecipesValue } from "../../controller/redux/recipes";
import { changeAdditionalValue } from "../../controller/redux/addtional";

//Models
import { recipeTypes } from "../../model/recipes";

function Main() {
	const dispatch: AppDispatch = useDispatch();
	const { recipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);
	const { recipeType }: AdittionalStateI = useSelector((state: RootState) => state.additional);

	useEffect(() => {
		getRecipes();
	}, [recipeType]);

	const getRecipes = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		const response = await recipeAPI.getRecipes(recipeType, 1);
		if(response?.status === 200) {
			dispatch(changeRecipesValue({key: "recipes", value: response.data}));
		}
		setTimeout(() => {
			dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
		}, 500);
	};

	const recipeTypeButtonStyle = (value: string) => {
		if(recipeType === value.toLowerCase()) {
			return {
				color: "white",
				backgroundColor: "#129575",
			};
		} else {
			return {
				color: "#129575",
				backgroundColor: "white",
			};
		}
	};

	return (
		<main className={styles.container}>
			<nav className={styles.navigation}>
				{
					recipeTypes.map((el: string, index: number): ReactElement => {
						return (
							<button 
								key={index}
								className={styles.type}
								style={recipeTypeButtonStyle(el)}
								onClick={() => dispatch(changeAdditionalValue({key: "recipeType", value: el.toLowerCase()}))}
							>{el}</button>
						);
					})
				}
			</nav>
			<RecipesList
				data={recipes}
				length={recipes.length}
				emptyMsg="There's no recipes by this type"
			/>
		</main>
	);
}

export default Main;
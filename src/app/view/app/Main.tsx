//Components
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { ReactElement } from "react";
import { RecipeI } from "../../types/recipes";
import { AdditionalStateI } from "../../types/additional";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Functions
import styles from "../../style/app/main.module.css";
import recipeAPI from "../../controller/api/recipes";
import { recipeTypeButtonStyle } from "../../controller/style";
import { changeAdditionalValue } from "../../controller/redux/additional";

//Models
import { recipeTypes } from "../../model/recipes";

export default function Main(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recipes, setRecipes] = useState<Array<RecipeI>>([]);
	const { recipeType, loadingStatus }: AdditionalStateI = useSelector((state: RootState) => state.additional);

	useEffect(() => {
		getRecipes();
	}, [recipeType, currentPage]);

	const getRecipes = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		
		const response = await recipeAPI.getRecipes(recipeType, currentPage);
		if(response?.status === 200) {
			setRecipes([...recipes, ...(response?.data as RecipeI[])]);
			dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
		}
	};

	const changeRecipesType = async (type: string): Promise<void> => {
		setRecipes([]);
		setCurrentPage(1);
		dispatch(changeAdditionalValue({key: "recipeType", value: type}));		
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
								style={recipeTypeButtonStyle(recipeType, el)}
								onClick={() => changeRecipesType(el.toLowerCase())}
							>{el}</button>
						);
					})
				}
			</nav>
			<RecipesList
				data={recipes}
				title="Recipes"
				deleteAbility={false}
				length={recipes.length}
				emptyMsg="There's no recipes by this type"
			/>
			{
				(!(recipes.length%8) && recipes.length > 0 && !loadingStatus) 
				&& 
				<button 
					className={styles.button} 
					onClick={() => setCurrentPage(currentPage+1)}
				>Load more</button>
			}
		</main>
	);
}
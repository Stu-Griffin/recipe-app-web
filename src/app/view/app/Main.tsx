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

	const changeCurrentPage = (): void => {
		setCurrentPage(currentPage+1);
	};

	const getRecipes = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		const response = await recipeAPI.getRecipes(recipeType, currentPage);
		if(response?.data.status === 200) {
			setRecipes([...recipes, ...(response?.data.data as Array<RecipeI>)]);
			dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
		}
	};

	const changeRecipesType = async (type: string): Promise<void> => {
		setRecipes([]);
		setCurrentPage(1);
		dispatch(changeAdditionalValue({key: "recipeType", value: type}));		
	};

	const recipeTypeButtonStyle = (value: string): object => {
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
								onClick={() => changeRecipesType(el.toLowerCase())}
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
			{(!(recipes.length%8) && recipes.length > 0 && !loadingStatus) && <button className={styles.button} onClick={changeCurrentPage}>Load more</button>}
		</main>
	);
}
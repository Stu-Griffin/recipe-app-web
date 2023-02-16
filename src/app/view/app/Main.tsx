//Components
import RecipeCard from "../reusable/RecipeCard";

//Icons

//Types
import { AdittionalStateI } from "../../types/additional";
import { AppDispatch, RootState } from "../../types/store";
import { RecipeI, RecipesStateI } from "../../types/recipes";

//Libraries
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Functions
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
		const response = await recipeAPI.getRecipes(recipeType, 1);
		if(response?.status === 200) {
			dispatch(changeRecipesValue({key: "recipes", value: response.data}));
		}
	};

	return (
		<main>
			<nav className="recipes-types">
				{
					recipeTypes.map((el: string, index: number): ReactElement => {
						return (
							<button 
								key={index}
								className="recipe-type" 
								onClick={() => dispatch(changeAdditionalValue({key: "recipeType", value: el.toLowerCase()}))}
							>{el}</button>
						);
					})
				}
			</nav>
			<section>
				{
					recipes.map((el: RecipeI): ReactElement => {
						return (
							<RecipeCard
								key={el._id}
								rate={el.rate} 
								image={el.image} 
								title={el.title} 
								authorLogin={el.authorLogin}
							/>
						);
					})
				}
			</section>
		</main>
	);
}

export default Main;
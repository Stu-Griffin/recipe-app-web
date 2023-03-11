//Components
import SearchArea from "./SearchArea";
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { ReactElement } from "react";
import { AdditionalStateI } from "../../types/additional";
import { AppDispatch, RootState } from "../../types/store";
import { RecipeI, RecipeSearchConfigI } from "../../types/recipes";

//Libraries
import Modal from "react-modal";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

//Functions
import styles from "../../style/app/main.module.css";
import recipeAPI from "../../controller/api/recipes";
import { recipeTypeButtonStyle } from "../../controller/style";
import { changeAdditionalValue } from "../../controller/redux/additional";

//Models
import { recipeSearchConfig, recipeTypes } from "../../model/recipes";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export default function Main(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(true);
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recipes, setRecipes] = useState<Array<RecipeI>>([]);
	const { recipeType, loadingStatus }: AdditionalStateI = useSelector((state: RootState) => state.additional);

	useMemo(() => {
		getRecipes(recipeType, currentPage, recipeSearchConfig, false);
	}, [recipeType, currentPage]);

	const toggle = (): void => {
		setIsOpen(!modalIsOpen);
	};

	const changeRecipesType = async (type: string): Promise<void> => {
		setRecipes([]);
		setCurrentPage(1);
		dispatch(changeAdditionalValue({key: "recipeType", value: type}));		
	};

	async function getRecipes(type: string, page: number|undefined, options: RecipeSearchConfigI, searchStatus: boolean): Promise<void> {
		setLoading(true);
		const response = await recipeAPI.getRecipes(dispatch, type, page, options);
		if(response?.status === 200 && response?.data) {
			(searchStatus) ? setRecipes([...(response?.data as RecipeI[])]) : setRecipes([...recipes, ...(response?.data as RecipeI[])]);
		}
		setLoading(false);
	}

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
			<Modal 
				style={customStyles}
				isOpen={modalIsOpen}
				onRequestClose={toggle}
			>
				<SearchArea
					search={(config: RecipeSearchConfigI): void => {
						toggle();
						getRecipes(recipeType, undefined, config, true);
					}}
				/>
			</Modal>
			<RecipesList
				data={recipes}
				title="Recipes"
				deleteAbility={false}
				loadingStatus={loading}
				length={recipes.length}
				ammountClickHandler={toggle}
				emptyMsg="There's no such recipes"
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
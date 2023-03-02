//Components
import InputArea from "../reusable/Input";
import RecipesList from "../reusable/RecipeList";

//Icons

//Types
import { ReactElement } from "react";
import { RecipeI, RecipeSearchConfigI } from "../../types/recipes";
import { AdditionalStateI } from "../../types/additional";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useReducer } from "react";

//Functions
import styles from "../../style/app/main.module.css";
import recipeAPI from "../../controller/api/recipes";
import { getButtonStyle } from "../../controller/style";
import { recipeTypeButtonStyle } from "../../controller/style";
import { regularValidation } from "../../controller/validation";
import { changeAdditionalValue } from "../../controller/redux/additional";
import { recipeErrorSearchConfigReducer, recipeSearchConfigReducer } from "../../controller/recipes";

//Models
import { recipeTypes, recipeErrorSearchConfig, recipeSearchConfig } from "../../model/recipes";

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
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recipes, setRecipes] = useState<Array<RecipeI>>([]);
	const [searchButtonDisabled, setSearchButtonDisabled] = useState<boolean>(true);
	const [searchConfig, searchConfigDispatch] = useReducer(recipeSearchConfigReducer, recipeSearchConfig);
	const { recipeType, loadingStatus }: AdditionalStateI = useSelector((state: RootState) => state.additional);
	const [errorSearchConfig, errorSearchConfigDispatch] = useReducer(recipeErrorSearchConfigReducer, recipeErrorSearchConfig);

	useEffect(() => {
		setSearchButtonDisabled(!Object.values(errorSearchConfig).some((el: boolean|null) => el === false));
	}, [errorSearchConfig]);

	useEffect(() => {
		getRecipes(recipeType, currentPage, searchConfig, false);
	}, [recipeType, currentPage]);

	const toggle = (): void => {
		setIsOpen(!modalIsOpen);
	};

	const getRecipes = async (type: string, page: number|undefined, options: RecipeSearchConfigI, searchStatus: boolean): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		const response = await recipeAPI.getRecipes(type, page, options);
		if(response?.status === 200 && response?.data) {
			if(searchStatus) {
				setRecipes([...(response?.data as RecipeI[])]);
				searchConfigDispatch({type: "set", payload: {key: "", value: recipeSearchConfig}});
				errorSearchConfigDispatch({type: "set", payload: {key: "", value: recipeErrorSearchConfig}});
			} else {
				setRecipes([...recipes, ...(response?.data as RecipeI[])]);
			}
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
			<Modal 
				style={customStyles}
				isOpen={modalIsOpen}
				onRequestClose={toggle}
			>
				<div className={styles.modal}>
					<InputArea
						error={null}
						title="Author login"
						placeholder="Author login"
						value={searchConfig.author}
						onChangeFunc={(e: string) => {
							searchConfigDispatch({type: "add", payload: {key: "author", value: e}});
							errorSearchConfigDispatch({type: "add", payload: {key: "author", value: regularValidation(e)}});
						}}
					/>
					<InputArea
						error={null}
						title="Recipe title"
						placeholder="Recipe title"
						value={searchConfig.title}
						onChangeFunc={(e: string) => {
							searchConfigDispatch({type: "add", payload: {key: "title", value: e}});
							errorSearchConfigDispatch({type: "add", payload: {key: "title", value: regularValidation(e)}});
						}}
					/>
					<div className={styles.ratesArea}>
						<h3>Recipes rates</h3>
						<div className={styles.ratesList}>
							{
								["5", "4", "3", "2", "1"].map((el: string, index: number): ReactElement => {
									return (
										<button 
											key={index}
											onClick={() => {
												searchConfigDispatch({type: "add", payload: {key: "rate", value: el}});
												errorSearchConfigDispatch({type: "add", payload: {key: "rate", value: regularValidation(el)}});
											}}
											className={styles.rates}
											style={recipeTypeButtonStyle(searchConfig.rate, el)}
										>{el}</button>
									);
								})
							}
							<button 
								onClick={() => {
									searchConfigDispatch({type: "add", payload: {key: "rate", value: ""}});
									errorSearchConfigDispatch({type: "add", payload: {key: "rate", value: regularValidation("")}});
								}}
								className={styles.rates}
								style={recipeTypeButtonStyle(searchConfig.rate, "")}
							>clear</button>
						</div>
					</div>
					<button
						disabled={searchButtonDisabled} 
						className={styles.searchButton}
						style={getButtonStyle(searchButtonDisabled)}
						onClick={() => {
							toggle();
							getRecipes(recipeType, undefined, searchConfig, true);
						}}
					>Search</button>
				</div>
			</Modal>
			<RecipesList
				data={recipes}
				title="Recipes"
				deleteAbility={false}
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
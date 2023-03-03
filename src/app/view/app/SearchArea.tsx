//Components
import InputArea from "../reusable/Input";

//Icons

//Types
import { ReactElement } from "react";
import { RecipeSearchConfigI } from "../../types/recipes";

//Libraries
import React, { useEffect, useState, useReducer } from "react";

//Functions
import styles from "../../style/app/main.module.css";
import { regularValidation } from "../../controller/validation";
import { recipeTypeButtonStyle, getButtonStyle } from "../../controller/style";
import { recipeErrorSearchConfigReducer, recipeSearchConfigReducer } from "../../controller/recipes";

//Models
import { recipeErrorSearchConfig, recipeSearchConfig } from "../../model/recipes";

interface PropsI {
	search: (config: RecipeSearchConfigI) => void;
}

export default function SearchArea({ search }: PropsI): ReactElement {
	const [searchButtonDisabled, setSearchButtonDisabled] = useState<boolean>(true);
	const [searchConfig, searchConfigDispatch] = useReducer(recipeSearchConfigReducer, recipeSearchConfig);
	const [errorSearchConfig, errorSearchConfigDispatch] = useReducer(recipeErrorSearchConfigReducer, recipeErrorSearchConfig);

	useEffect(() => {
		setSearchButtonDisabled(!Object.values(errorSearchConfig).some((el: boolean|null) => el === false));
	}, [errorSearchConfig]);

	return (
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
				onClick={() => {
					search(searchConfig);
					searchConfigDispatch({type: "set", payload: {key: "", value: recipeSearchConfig}});
					errorSearchConfigDispatch({type: "set", payload: {key: "", value: recipeErrorSearchConfig}});
				}}
				disabled={searchButtonDisabled} 
				className={styles.searchButton}
				style={getButtonStyle(searchButtonDisabled)}
			>Search</button>
		</div>
	);
}
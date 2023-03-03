//Components
import Loader from "../reusable/Loader";
import InputArea from "../reusable/Input";
import ListAdd from "../reusable/ListAdd";

//Icons

//Types
import { ProfileStateI } from "../../types/profile";
import { AdditionalStateI } from "../../types/additional";
import { AppDispatch, RootState } from "../../types/store";
import { RecipeErrorFormStateI, RecipeFormStateI } from "../../types/recipes";

//Libraries
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageUploading, { ImageListType } from "react-images-uploading";
import React, { ReactElement, useEffect, useReducer, useState } from "react";

//Functions
import recipeAPI from "../../controller/api/recipes";
import { getButtonStyle } from "../../controller/style";
import styles from "../../style/app/create-recipe.module.css";
import { regularValidation } from "../../controller/validation";
import { changeAdditionalValue } from "../../controller/redux/additional";
import { recipeFormReducer, recipeErrorFormReducer } from "../../controller/recipes";

//Models
import { recipeFormState, recipeErrorFormState, recipeTypes } from "../../model/recipes";

const allowedImgTypes = ["jpg", "png", "jpeg"];

export default function CreateRecipe() {
	const maxNumber = 69;
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const [image, setImage] = useState<string>("");
	const [imgId, setImgId] = useState<string>("");
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);
	const [recipe, recipeDispatch] = useReducer(recipeFormReducer, recipeFormState);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const { editRecipeId }: AdditionalStateI = useSelector((state: RootState) => state.additional);
	const [recipError, recipeErrorDispatch] = useReducer(recipeErrorFormReducer, recipeErrorFormState);

	useEffect(() => {
		if(editRecipeId === "") {
			recipeDispatch({type: "add", payload: {key: "authorId", value: userId}});
			recipeDispatch({type: "add", payload: {key: "authorLogin", value: user.login}});
			recipeDispatch({type: "add", payload: {key: "type", value: (recipeTypes[0]).toLowerCase()}});
		} else {
			setRecipe();
		}
	}, [user]);

	useEffect(() => {
		setDisabledStatus(!(Object.values(recipError).every((el: boolean) => el === false)));
	}, [recipError]);

	useEffect(() => {
		if(recipe.steps.length === 0) {
			recipeErrorDispatch({type: "add", payload: {key: "steps", value: true}});
		} else {
			recipeErrorDispatch({type: "add", payload: {key: "steps", value: false}});
		}
	}, [recipe.steps]);

	useEffect(() => {
		if(recipe.ingredients.length === 0) {
			recipeErrorDispatch({type: "add", payload: {key: "ingredients", value: true}});
		} else {
			recipeErrorDispatch({type: "add", payload: {key: "ingredients", value: false}});
		}
	}, [recipe.ingredients]);

	const convertData = (): FormData => {
		const data: FormData = new FormData();

		data.append("type", recipe.type);
		data.append("title", recipe.title);
		data.append("image", recipe.image);
		data.append("rate", `${recipe.rate}`);
		data.append("authorId", recipe.authorId);
		data.append("authorLogin", recipe.authorLogin);
		data.append("description", recipe.description);
		data.append("steps", (JSON.stringify(recipe.steps)));
		data.append("ingredients", (JSON.stringify(recipe.ingredients)));

		(editRecipeId !== "") && data.append("imgId", imgId);

		return data;
	};

	const setRecipe = async (): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));
		
		const response = await recipeAPI.getRecipeBuItsId(editRecipeId);
		if(response?.status === 200 && response?.data) {
			const recipeEdit: RecipeFormStateI = {
				authorLogin: user.login,
				rate: response.data.rate,
				type: response.data.type,
				steps: response.data.steps,
				title: response.data.title,
				image: response.data.image,
				authorId: response.data.authorId,
				ingredients: response.data.ingredients,
				description: response.data.description,
			};
			const recipeEditErrors: RecipeErrorFormStateI = {
				image: false,
				title: false,
				steps: false,
				ingredients: false,
				description: false,
			};

			setImage(response.data.image);
			setImgId(response.data.imgId);

			recipeDispatch({type: "set", payload: {key: "", value: recipeEdit}});
			recipeErrorDispatch({type: "set", payload: {key: "", value: recipeEditErrors}});
		}
		
		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};

	const pickImage = (imageList: ImageListType): void => {
		const file = imageList[0].file;
		if(allowedImgTypes.some((el: string) => el === file?.type.split("/")[1])) {
			setImage(imageList[0].data_url);
			recipeDispatch({type: "add", payload: {key: "image", value: file}});
			recipeErrorDispatch({type: "add", payload: {key: "image", value: false}});
		} else {
			console.log(`Image should be in ${allowedImgTypes} format`);
		}
	};

	const recipeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		recipeDispatch({type: "add", payload: {key: "type", value: (e.target.value).toLowerCase()}});
	};

	const createRecipe = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
		dispatch(changeAdditionalValue({key: "loadingStatus", value: true}));

		e.preventDefault();
		const response = (editRecipeId === "") ? await recipeAPI.createRecipe(convertData()) : await recipeAPI.editRecipe(convertData(), editRecipeId);

		if(response?.status === 200) {
			dispatch(changeAdditionalValue({key: "editRecipeId", value: ""}));
			navigate("/");
		}
		console.log(response?.data);

		dispatch(changeAdditionalValue({key: "loadingStatus", value: false}));
	};
	
	return (
		<main className={styles.container}>
			<Loader/>
			<form className={styles.form}>
				<ImageUploading
					value={[]}
					onChange={pickImage}
					dataURLKey="data_url"
					maxNumber={maxNumber}
				>
					{({ onImageUpload }) => (
						(image === "") 
							?
							<div 
								onClick={onImageUpload}
								className={styles.image} 
							>
								<p className={styles.imageText}>Pick recipe image</p>
							</div>
							:
							<img 
								src={image}
								alt="user avatar"
								onClick={onImageUpload}
								className={styles.image}
							/>
					)}
				</ImageUploading>
				<InputArea
					error={false}
					title={"Title"}
					value={recipe.title}
					placeholder={"Enter Title"}
					onChangeFunc={(e: string): void => {
						recipeDispatch({type: "add", payload: {key: "title", value: e}});
						recipeErrorDispatch({type: "add", payload: {key: "title", value: regularValidation(e)}});
					}}
				/>
				<InputArea
					error={false}
					multiple={true}
					title={"Description"}
					value={recipe.description}
					placeholder={"Enter Description"}
					onChangeFunc={(e: string): void => {
						recipeDispatch({type: "add", payload: {key: "description", value: e}});
						recipeErrorDispatch({type: "add", payload: {key: "description", value: regularValidation(e)}});
					}}
				/>
				<select className={styles.checkbox} name="select" defaultValue={recipe.type} onChange={recipeTypeChange}>
					{
						recipeTypes.map((el: string): ReactElement => {
							return (
								<option 
									key={el} 
									value={el}
									className={styles.checkboxEl} 
								>{el}</option>
							);
						})
					}
				</select>
				<ListAdd
					title="Ingredients"
					data={recipe.ingredients}
					placeholder="Enter Ingredients"
					saveEl={(value: string): void => {
						recipeDispatch({type: "addIngredients", payload: {key: "ingredients", value: value}});
					}}
					removeEl={(value: number): void => {
						recipeDispatch({type: "deleteIngredients", payload: {key: "ingredients", value: value}});
					}}
					moveEl={(what: number, where: number, el: string): void => {
						recipeDispatch({type: "moveIngredient", payload: {key: "ingredients", value: {what, where, el}}});
					}}
				/>
				<ListAdd
					title="Steps"
					multiple={true}
					data={recipe.steps}
					listNumbering={true}
					placeholder="Enter Steps"
					saveEl={(value: string): void => {
						recipeDispatch({type: "addSteps", payload: {key: "steps", value: value}});
					}}
					removeEl={(value: number): void => {
						recipeDispatch({type: "deleteSteps", payload: {key: "steps", value: value}});
					}}
					moveEl={(what: number, where: number, el: string): void => {
						recipeDispatch({type: "moveSteps", payload: {key: "steps", value: {what, where, el}}});
					}}
				/>
				<button
					onClick={createRecipe}
					disabled={disabledStatus}
					className={styles.button}
					style={getButtonStyle(disabledStatus)} 
				>{(editRecipeId === "") ? "Create" : "Change"} recipe</button>
			</form>
		</main>
	);
}
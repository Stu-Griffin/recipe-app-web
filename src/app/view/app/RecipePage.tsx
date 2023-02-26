//Components
import RateBox from "../reusable/RateBox";

//Icons
import SavedIcon from "../../../assets/icons/saved";
import DeleteIcon from "../../../assets/icons/delete";

//Types
import { ProfileStateI } from "../../types/profile";
import { AppDispatch, RootState } from "../../types/store";
import { RecipeI, RecipesStateI, SavedRecipeI } from "../../types/recipes";

//Libraries
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { Puff } from  "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import React, { ReactElement, useEffect, useState } from "react";

//Functions
import recipeAPI from "../../controller/api/recipes";
import styles from "../../style/app/recipe-page.module.css";
import { recipeTypeButtonStyle } from "../../controller/style";
import { removeSavedRecipe, addSavedRecipe } from "../../controller/redux/recipes";

//Models

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

export default function RecipePage() {
	const navigate = useNavigate();
	const { recipeId } = useParams();
	const dispatch: AppDispatch = useDispatch();
	const [data, setData] = useState<string[]>([]);
	const [rating, setRating] = useState<number>(0);
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
	const [recipe, setRecipe] = useState<RecipeI|undefined>(undefined);
	const [activeList, setActiveList] = useState<string>("ingredients");
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const { savedRecipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);

	useEffect(() => {
		getRecipe();
	}, [recipeId]);

	useEffect(() => {
		if(recipe) {
			if(activeList === "ingredients") {
				setData(recipe.ingredients);
			} else {
				setData(recipe.steps);
			}
		}
	}, [activeList, recipe]);

	const toggle = (): void => {
		setIsOpen(!modalIsOpen);
	};

	const saveRecipe = (): void => {
		if(checkSavedRecipes()) {
			dispatch(removeSavedRecipe(recipe?._id));
		} else {
			dispatch(addSavedRecipe({
				_id: recipe?._id,
				rate: recipe?.rate,
				title: recipe?.title,
				image: recipe?.image,
				authorId: recipe?.authorId,
				authorLogin: recipe?.authorLogin,
			}));
		}
	};

	const checkSavedRecipes = (): boolean => {
		return savedRecipes.some((el: SavedRecipeI) => el._id === recipe?._id);
	};

	const changeRate = async (): Promise<void> => {
		toggle();
		setLoadingStatus(true);

		const response = await recipeAPI.changeRecipesRate((recipe as RecipeI)._id, { newRate: rating, rate: (recipe as RecipeI).rate });
		if(response?.status === 200) {
			const newRecipe = JSON.parse(JSON.stringify(recipe));
			newRecipe.rate = Math.round((((recipe as RecipeI).rate)+(rating))/2);
			setRecipe(newRecipe);
		}
		console.log(response?.data);

		setLoadingStatus(false);
	};

	const handleRating = (rate: number): void => {
		setRating(rate);
	};

	const getRecipe = async (): Promise<void> => {
		setLoadingStatus(true);

		if(recipeId) {
			const response = await recipeAPI.getRecipeBuItsId(recipeId);
			if(response?.status === 200) setRecipe(response?.data);
		}

		setTimeout(() => {
			setLoadingStatus(false);
		}, 1500);
	};

	const deleteRecipe = async (): Promise<void> => {
		setLoadingStatus(true);
		const response = await recipeAPI.deleteRecipe((recipe as RecipeI)._id, (recipe as RecipeI).imgId);
		setLoadingStatus(false);
		if(response?.status === 200) navigate("/");
		console.log(response?.data);
	};

	if(!loadingStatus) {
		if(recipe) {
			return (
				<main className={styles.container}>
					{
						(userId === recipe.authorId) &&
							<label
								onClick={deleteRecipe}
								className={styles.delete}
							>
								<DeleteIcon
									width={25}
									height={25}
								/>
							</label>
					}
					<article className={styles.card} style={{backgroundImage: `url(${recipe.image})`}}>
						<div className={styles.linearGradient}>
							<label 
								className={styles.rate}
								onClick={() => (userId !== "") && toggle()}
							>
								<RateBox
									rate={recipe.rate}
								/>
							</label>
							<Modal
								style={customStyles}
								isOpen={modalIsOpen}
								onRequestClose={toggle}
							>
								<div className={styles.changeRateBox}>
									<Rating onClick={handleRating}/>
									<button className={styles.changeRateButton} onClick={changeRate}>Vote</button>
								</div>
							</Modal>
							<div className={styles.content}>
								<div>
									<h1 className={styles.title}>{recipe?.title}</h1>
									<p className={styles.author}>{recipe?.authorLogin}</p>
								</div>
								{
									(userId !== "") &&
									<button 
										onClick={saveRecipe}
										className={styles.button}
									>
										<SavedIcon
											width={25}
											height={25}
											fill={checkSavedRecipes() ? "black" : "transparent"}
										/>
									</button>
								}
							</div>
						</div>
					</article>
					<p className={styles.description}>{recipe.description}</p>
					<article>
						<div className={styles.navigation}>
							<button
								className={styles.navigationButton}
								onClick={() => setActiveList("ingredients")}
								style={recipeTypeButtonStyle(activeList, "ingredients")}
							>Ingredient</button>
							<button
								className={styles.navigationButton}
								onClick={() => setActiveList("steps")}
								style={recipeTypeButtonStyle(activeList, "steps")}
							>Procedure</button>
						</div>
						<div className={styles.list}>
							{
								data.map((el: string, index: number): ReactElement => {
									return (
										<div className={styles.element} key={index}>
											<h4 className={styles.index}>{index+1}</h4>
											<p className={styles.text}>{el}</p>
										</div>
									);
								})
							}
						</div>
					</article>
				</main>
			);
		} else {
			return (
				<h1>Error</h1>
			);
		}
	} else {
		return (
			<Puff
				width="80"
				radius={1}
				height="80"
				color="#129575"
				wrapperStyle={{
					marginTop: "10rem"
				}}
				wrapperClass="loader"
				visible={loadingStatus}
				ariaLabel="puff-loading"
			/>
		);
	}
}
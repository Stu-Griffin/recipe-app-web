//Components
import RateBox from "../reusable/RateBox";

//Icons
import EditIcon from "../../../assets/icons/edit";
import SavedIcon from "../../../assets/icons/saved";
import DeleteIcon from "../../../assets/icons/delete";
import DefaultAvatar from "../../../assets/icons/avatar";

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
import userAPI from "../../controller/api/user";
import recipeAPI from "../../controller/api/recipes";
import styles from "../../style/app/recipe-page.module.css";
import { recipeTypeButtonStyle } from "../../controller/style";
import { changeAdditionalValue } from "../../controller/redux/additional";
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
	const [authorAvatar, setAuthorAvatar] = useState<string|undefined>(undefined);
	const { userId, user }: ProfileStateI = useSelector((state: RootState) => state.profile);
	const { savedRecipes }: RecipesStateI = useSelector((state: RootState) => state.recipes);

	useEffect(() => {
		getRecipe();
	}, [recipeId]);

	useEffect(() => {
		if(recipe) (activeList === "ingredients") ? setData(recipe.ingredients) : setData(recipe.steps);
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

	const editRecipe = (): void => {
		dispatch(changeAdditionalValue({key: "editRecipeId", value: recipe?._id}));
		navigate("/create-recipe/");
	};

	const getAuthorLogin = (): string => {
		if(recipe?.authorLogin === user.login) {
			return "You";
		} else {
			return ((recipe as RecipeI).authorLogin.length > 15 ? `${(recipe as RecipeI).authorLogin.slice(0, 15)}...` : (recipe as RecipeI).authorLogin);
		}
	};

	const checkSavedRecipes = (): boolean => {
		return savedRecipes.some((el: SavedRecipeI) => el._id === recipe?._id);
	};

	const handleRating = (rate: number): void => {
		setRating(rate);
	};

	const getRecipe = async (): Promise<void> => {
		setLoadingStatus(true);

		if(recipeId) {
			const response = await recipeAPI.getRecipeBuItsId(recipeId);
			if(response?.status === 200 && response?.data) {
				const user = await userAPI.getUser(response.data.authorId);
				if(user.status === 200 && user.data) {
					response.data.authorLogin = user.data.login;
					setAuthorAvatar(user.data.avatar);
				}
				setRecipe(response.data);
			}
		}

		setTimeout(() => {
			setLoadingStatus(false);
		}, 1500);
	};

	const changeRate = async (): Promise<void> => {
		setLoadingStatus(true);

		toggle();
		const response = await recipeAPI.changeRecipesRate((recipe as RecipeI)._id, { newRate: rating, rate: (recipe as RecipeI).rate });
		if(response?.status === 200) {
			const newRecipe = JSON.parse(JSON.stringify(recipe));
			newRecipe.rate = Math.round((((recipe as RecipeI).rate)+(rating))/2);
			setRecipe(newRecipe);
		}
		console.log(response?.data);

		setLoadingStatus(false);
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
						<div className={styles.actionButtonArea}>
							<label
								onClick={editRecipe}
								className={styles.actionButton}
							>
								<EditIcon
									width={35}
									height={35}
								/>
							</label>
							<label
								onClick={deleteRecipe}
								className={styles.actionButton}
							>
								<DeleteIcon
									width={25}
									height={25}
								/>
							</label>
						</div>
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
									<button 
										onClick={changeRate}
										className={styles.changeRateButton} 
									>Vote</button>
								</div>
							</Modal>
							{
								(userId !== "") &&
									<label 
										onClick={saveRecipe}
										className={styles.button}
									>
										<SavedIcon
											width={25}
											height={25}
											fill={checkSavedRecipes() ? "black" : "transparent"}
										/>
									</label>
							}
						</div>
					</article>
					<div className={styles.recipeMainInfo}>
						{
							(authorAvatar !== "" && authorAvatar) 
								?
								<img 
									className={styles.avatar}
									src={authorAvatar} 
									alt="author avatar"
								/>
								:
								<DefaultAvatar
									width={75}
									height={75}
								/>
						}
						<div className={styles.info}>
							<h3 className={styles.title}>{recipe?.title}</h3>
							<h4 className={styles.author}>By: {getAuthorLogin()}</h4>
						</div>
					</div>
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
				<h1 className={styles.errorMsg}>This recipe was deleted</h1>
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
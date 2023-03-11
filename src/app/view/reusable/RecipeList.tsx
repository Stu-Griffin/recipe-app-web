//Icons
import CrossIcon from "../../../assets/icons/cross";

//Types
import { ReactElement } from "react";
import { RecipeI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { AppDispatch, RootState } from "../../types/store";

//Models

//Libraries
import React, { useRef } from "react";
import { Puff } from  "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

//Functions
import userAPI from "../../controller/api/user";
import styles from "../../style/reusable/recipes-list.module.css";
import { changeUserProfileValue } from "../../controller/redux/profile";
import { changeFlashMessage } from "../../controller/redux/flashMessage";

//Components
import RecipeCard from "./RecipeCard";

interface PropsI {
	title: string;
	length: number;
	data: RecipeI[];
	emptyMsg: string;
	loadingStatus: boolean;
	deleteAbility: boolean;
	ammountClickHandler?: () => void;
}

export default function RecipesList({
	data,
	title,
	length,
	emptyMsg,
	deleteAbility,
	loadingStatus,
	ammountClickHandler,
}: PropsI): ReactElement {
	const nodeRef = useRef(null);
	const listNodeRef = useRef(null);
	const dispatch: AppDispatch = useDispatch();
	const { user, userId }: ProfileStateI = useSelector((state: RootState) => state.profile);

	const getList = (): ReactElement => {
		if(length === 0) {
			return (!loadingStatus) ? <h3 ref={nodeRef} className={styles.error}>{emptyMsg}</h3> : <></>;
		} else {
			return (
				<div 
					ref={listNodeRef} 
					className={styles.list}
				>
					{
						data.map((el: RecipeI) => {
							return (
								<div key={el._id}>
									<div
										ref={nodeRef}
										className={styles.recipe}
									>
										{
											(deleteAbility) 
												&&
												<CrossIcon 
													width={30} 
													height={30} 
													style={{cursor: "pointer"}}
													onClick={() => unSaveRecipe(el._id)}
												/>
										}
										<RecipeCard
											id={el._id}
											rate={el.rate} 
											image={el.image} 
											title={el.title} 
											authorLogin={el.authorLogin}
										/>
									</div>
								</div>
							);
						})
					}
				</div>
			);
		}
	};

	const unSaveRecipe = async (id: string): Promise<void> => {
		const formData: FormData = new FormData();
		const savedRecipes = user.savedRecipes.filter((el: string) => el !== id);
		formData.append("savedRecipes", JSON.stringify(savedRecipes));
		const response = await userAPI.changeUser(dispatch, userId, formData);
		if(response?.status === 200 && response?.data) {
			dispatch(changeUserProfileValue({key: "savedRecipes", value: savedRecipes}));
		}
		dispatch(changeFlashMessage({
			show: true,
			duration: 5000,
			description: response?.data,
			status: response?.status === 200 ? "SUCCESS" : "WARN", 
			message: response?.status === 200 ? "Recipe was removed from saved list" : "Something went wrong",
		}));
	};

	return (
		<article className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>{title}</h3>
				<p 
					className={styles.ammount}
					onClick={ammountClickHandler}
				>{length} results</p>
			</div>
			<CSSTransition
				unmountOnExit
				timeout={1000}
				in={!loadingStatus}
				nodeRef={listNodeRef}
				classNames="recipe-list"
			>
				{getList()}
			</CSSTransition>
			<Puff
				width="80"
				radius={1}
				height="80"
				color="#129575"
				wrapperClass="loader"
				visible={loadingStatus}
				ariaLabel="puff-loading"
			/>
		</article>
	);
}
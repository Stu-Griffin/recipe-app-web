//Components
import RecipeCard from "../reusable/RecipeCard";

//Icons
import CrossIcon from "../../../assets/icons/cross";

//Types
import { RecipeI } from "../../types/recipes";
import { ProfileStateI } from "../../types/profile";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import { Puff } from  "react-loader-spinner";
import React, { ReactElement, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//Functions
import userAPI from "../../controller/api/user";
import styles from "../../style/reusable/recipes-list.module.css";
import { changeUserProfileValue } from "../../controller/redux/profile";
import { changeFlashMessage } from "../../controller/redux/flashMessage";

//Models

interface PropsI {
	title: string;
	length: number;
	data: RecipeI[];
	emptyMsg: string;
	loadingStatus: boolean;
	deleteAbility: boolean;
	ammountClickHandler?: () => void;
}

export default function RecipesList({ ammountClickHandler, loadingStatus, data, length, emptyMsg, deleteAbility, title }: PropsI) {
	const nodeRef = useRef(null);
	const dispatch: AppDispatch = useDispatch();
	const { user, userId }: ProfileStateI = useSelector((state: RootState) => state.profile);

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

	const getList = (): ReactElement => {
		if(length === 0) {
			if(!loadingStatus) {
				return (
					<h3 className={styles.error}>{emptyMsg}</h3>
				);
			} else {
				return (		
					<></>
				);
			}
		} else {
			return (
				<div className={styles.list}>
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

	return (
		<article className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>{title}</h3>
				<p 
					className={styles.ammount}
					onClick={ammountClickHandler}
				>{length} results</p>
			</div>
			{getList()}
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
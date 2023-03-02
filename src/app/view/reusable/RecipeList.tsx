//Components
import RecipeCard from "../reusable/RecipeCard";

//Icons
import CrossIcon from "../../../assets/icons/cross";

//Types
import { AppDispatch, RootState } from "../../types/store";
import { AdditionalStateI } from "../../types/additional";
import { RecipeI, SavedRecipeI } from "../../types/recipes";

//Libraries
import { Puff } from  "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import React, { ReactElement, useState, useRef } from "react";

//Functions
import styles from "../../style/reusable/recipes-list.module.css";
import { removeSavedRecipe } from "../../controller/redux/recipes";

//Models

interface PropsI {
	title: string;
	length: number;
	emptyMsg: string;
	deleteAbility: boolean;
	data: RecipeI[]|SavedRecipeI[];
	ammountClickHandler?: () => void;
}

export default function RecipesList({ ammountClickHandler, data, length, emptyMsg, deleteAbility, title }: PropsI) {
	const nodeRef = useRef(null);
	const dispatch: AppDispatch = useDispatch();
	const [deleteId, setDeleteId] = useState<string|null>(null);
	const { loadingStatus }: AdditionalStateI = useSelector((state: RootState) => state.additional);

	const getList = (): ReactElement => {
		if(length === 0) {
			return (
				<h3 className={styles.error}>{emptyMsg}</h3>
			);
		} else {
			return (
				<div className={styles.list}>
					{
						data.map((el: RecipeI|SavedRecipeI) => {
							return (
								<div key={el._id}>
									<CSSTransition
										timeout={300}
										unmountOnExit
										nodeRef={nodeRef}
										classNames="recipe"
										in={!(deleteId === el._id)}
										onExited={() => dispatch(removeSavedRecipe(deleteId))}
									>
										<div className={styles.recipe} ref={nodeRef}>
											{
												(deleteAbility) 
												&&
												<CrossIcon 
													width={30} 
													height={30} 
													style={{cursor: "pointer"}}
													onClick={() => setDeleteId(el._id)}
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
									</CSSTransition>
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
			{(!loadingStatus) && getList()}
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
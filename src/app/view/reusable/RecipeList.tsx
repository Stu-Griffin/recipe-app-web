//Components
import RecipeCard from "../reusable/RecipeCard";

//Icons

//Types
import { RootState } from "../../types/store";
import { AdditionalStateI } from "../../types/additional";
import { RecipeI, SavedRecipeI } from "../../types/recipes";

//Libraries
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { Puff } from  "react-loader-spinner";

//Functions
import styles from "../../style/reusable/recipes-list.module.css";

//Models

interface PropsI {
	length: number;
	emptyMsg: string;
	data: RecipeI[]|SavedRecipeI[];
}

export default function RecipesList({ data, length, emptyMsg }: PropsI) {
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
								<RecipeCard
									id={el._id}
									key={el._id}
									rate={el.rate} 
									image={el.image} 
									title={el.title} 
									authorLogin={el.authorLogin}
								/>
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
				<h2 className={styles.title}>Your recipes</h2>
				<p className={styles.ammount}>{length} results</p>
			</div>
			{(!loadingStatus && data.length !== 0) && getList()}
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
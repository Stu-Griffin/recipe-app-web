//Components
import RecipeCard from "../reusable/RecipeCard";

//Icons

//Types
import { RootState } from "../../types/store";
import { AdittionalStateI } from "../../types/additional";
import { RecipeI, SavedRecipeI } from "../../types/recipes";

//Libraries
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { Puff } from  "react-loader-spinner";

//Functions

//Models

interface PropsI {
	length: number;
	emptyMsg: string;
	data: RecipeI[]|SavedRecipeI[];
}

export default function RecipesList({ data, length, emptyMsg }: PropsI) {
	const { loadingStatus }: AdittionalStateI = useSelector((state: RootState) => state.additional);

	const getList = (): ReactElement => {
		if(length === 0) {
			return (
				<h3 className="errorMsg">{emptyMsg}</h3>
			);
		} else {
			return (
				<div className="recipes-list-area">
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
		<article className="recipes-list">
			<div className="recipes-list-header">
				<h2>Your recipes</h2>
				<p>{length} results</p>
			</div>
			<Puff
				width="80"
				radius={1}
				height="80"
				color="#129575"
				wrapperClass="loader"
				visible={loadingStatus}
				ariaLabel="puff-loading"
			/>
			{(!loadingStatus) && getList()}
		</article>
	);
}
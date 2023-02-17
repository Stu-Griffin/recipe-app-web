//Components
import RecipeCard from "../reusable/RecipeCard";

//Icons

//Types
import { RecipeI, SavedRecipeI } from "../../types/recipes";

//Libraries
import React, { ReactElement } from "react";

//Functions

//Models

interface PropsI {
	length: number;
	emptyMsg: string;
	data: RecipeI[]|SavedRecipeI[];
}

export default function RecipesList({ data, length, emptyMsg }: PropsI) {
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
			{getList()}
		</article>
	);
}
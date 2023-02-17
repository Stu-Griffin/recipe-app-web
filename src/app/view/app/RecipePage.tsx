//Components
import RateBox from "../reusable/RateBox";

//Icons
import SavedIcon from "../../../assets/icons/saved";
import DeleteIcon from "../../../assets/icons/delete";

//Types
import { RecipeI } from "../../types/recipes";
import { RootState } from "../../types/store";
import { ProfileStateI } from "../../types/profile";

//Libraries
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";

//Functions
import recipeAPI from "../../controller/api/recepies";

//Models

// {
// 	"_id": "63ee34bd0fbf5d4736b7b8ee",
// 	"type": "main",
// 	"image": "http://res.cloudinary.com/dwekcvff4/image/upload/v1676555452/recipe-app/recipes/hcz2wueyylppzybbb11s.jpg",
// 	"title": "Fried Chicken",
// 	"steps": [
// 		"To make the spice mix, combine all the ingredients. Whisk the milk with the vinegar, egg, ½ tsp salt and 1 tbsp spice mix in a bowl or deep plastic container to make the buttermilk marinade. Open the chicken thighs and put between two pieces of baking parchment, then flatten using a rolling pin. Transfer to the marinade, then cover and chill for 4 hrs, or overnight.",
// 		"Make the coating by combining the flours and turmeric with most of the remaining spice mix (reserving 1 tsp) and a generous pinch of salt. Drain the chicken thighs, reserving the marinade. One by one, dredge each thigh in the flour, then dip in the reserved marinade, then dredge again in the flour, pressing on as much as you can to coat. Transfer the coated thighs to a large plate.",
// 		"Heat a 10cm depth of oil in a shallow saucepan or deep-fat fryer until it reaches 175C. Lower two or three of the thighs in at a time and fry undisturbed for 3 mins, making sure the temperature doesn’t drop below 160C (it should stay at about 170C). Flip the thighs, then fry for another 2-3 mins until deeply golden and crisp on both sides. Lift the chicken out and transfer to a tray lined with kitchen paper to drain, then put on a rack and keep warm in a low oven while you fry the remaining thighs.",
// 		"When all the chicken has been fried, combine the reserved spice mix with 1 tbsp flaky sea salt and sprinkle over the chicken to serve."
// 	],
// 	"authorId": "63ed09c8ca0722a694d6127e",
// 	"authorLogin": "Maximus",
// 	"description": "Choose boneless thighs to make the ultimate fried chicken. For the coating, we've come up with a method that results in the crispiest finish ever",
// 	"ingredients": [
// 		"8 skinless boneless chicken thighs",
// 		"sunflower oil, for deep-frying",
// 		"2 tbsp paprika",
// 		"2 tsp garlic granules",
// 		"1 tsp chilli powder",
// 		"1 tsp black pepper",
// 		"½ tsp dried oregano",
// 		"1 chicken stock cube",
// 		"500ml whole milk",
// 		"2 tbsp cider or white wine vinegar",
// 		"1 egg",
// 		"100g self-raising flour",
// 		"100g cornflour",
// 		"¼ tsp turmeric"
// 	],
// 	"rate": 3,
// 	"__v": 0
// }

export default function RecipePage() {
	const { recipeId } = useParams();
	const [data, setData] = useState<string[]>([]);
	const [recipe, setRecipe] = useState<RecipeI|undefined>(undefined);
	const [activeList, setActiveList] = useState<string>("ingredients");
	const { userId }: ProfileStateI = useSelector((state: RootState) => state.profile);

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

	const getRecipe = async (): Promise<void> => {
		if(recipeId) {
			const response = await recipeAPI.getRecipeBuItsId(recipeId);
			if(response.status === 200) {
				setRecipe(response.data);
			}
		}
	};

	const getButtonStyle = (value: string): object => {
		if(value === activeList) {
			return {
				color: "white",
				backgroundColor: "#129575",
			};
		} else {
			return {
				color: "#129575",
				backgroundColor: "white",
			};
		}
	};

	const saveRecipe = () => {
		console.log("save");
	};

	if(recipe) {
		return (
			<section className="recipe-page">
				{
					(userId === recipe.authorId) &&
						<label className="delete">
							<DeleteIcon
								width={25}
								height={25}
							/>
						</label>
				}
				<article className="recip-page-card" style={{backgroundImage: `url(${recipe.image})`}}>
					<div className="recip-page-linear-gradient"></div>
					<label 
						className="rate" 
						onClick={saveRecipe}
					>
						<RateBox
							rate={recipe.rate}
						/>
					</label>
					<div className="recipe-page-content-info">
						<div>
							<h1>{recipe?.title}</h1>
							<p>{recipe?.authorLogin}</p>
						</div>
						{
							(userId !== "") &&
									<button className="saved-button">
										<SavedIcon
											width={25}
											height={25}
										/>
									</button>
						}
					</div>
				</article>
				<p className="recipe-description">{recipe.description}</p>
				<article className="recipe-page-list">
					<div className="navigation">
						<button
							style={getButtonStyle("ingredients")}
							onClick={() => {
								setActiveList("ingredients");
							}}
						>Ingredient</button>
						<button
							style={getButtonStyle("steps")}
							onClick={() => {
								setActiveList("steps");
							}}
						>Procedure</button>
					</div>
					<div className="list">
						{
							data.map((el: string, index: number): ReactElement => {
								return (
									<div key={index}>
										<h4>{index+1}</h4>
										<p>{el}</p>
									</div>
								);
							})
						}
					</div>
				</article>
			</section>
		);
	} else {
		return (
			<h1>Error</h1>
		);
	}
}
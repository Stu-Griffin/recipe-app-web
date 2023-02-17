//Components
import RateBox from "./RateBox";

//Icons

//Types

//Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

//Functions

//Models

interface PropsI {
	id: string;
	rate: number; 
	image: string; 
	title: string; 
	authorLogin: string;
}

export default function RecipeCard({id, rate, image, title, authorLogin}: PropsI) {
	const navigate = useNavigate();

	const move = () => {
		navigate(`/recipe/${id}`);
	};

	return (
		<div 
			onClick={move}
			className="recipe-card" 
			style={{backgroundImage: `url(${image})`}}
		>
			<div className="linear-gradient">
				<div className="recipe-title">
					<RateBox
						rate={rate}
					/>
				</div>
				<div className="recipe-info">
					<h3>{title}</h3>
					<p>{authorLogin}</p>
				</div>
			</div>
		</div>
	);
}
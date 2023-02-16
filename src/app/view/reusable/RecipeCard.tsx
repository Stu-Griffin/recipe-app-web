//Components

//Icons
import star from "../../../assets/icons/star.svg";

//Types

//Libraries
import React from "react";

//Functions

//Models

interface PropsI {
	rate: number; 
	image: string; 
	title: string; 
	authorLogin: string;
}

export default function RecipeCard({rate, image, title, authorLogin}: PropsI) {
	return (
		<div className="recipe-card" style={{backgroundImage: `url(${image})`}}>
			<div className="linear-gradient">
				<div className="recipe-title">
					<div className="rate-box">
						<img src={star} className="star" alt="recipe rate"/>
						<p>{rate}</p>
					</div>
				</div>
				<div className="recipe-info">
					<h3>{title}</h3>
					<p>{authorLogin}</p>
				</div>
			</div>
		</div>
	);
}
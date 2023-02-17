//Components

//Icons
import Star from "../../../assets/icons/star";

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
						<Star width={20} height={20}/>
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
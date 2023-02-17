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
}

export default function RateBox({ rate }: PropsI) {
	return (
		<div className="rate-box">
			<Star 
				width={20} 
				height={20}
			/>
			<p>{rate}</p>
		</div>
	);
}
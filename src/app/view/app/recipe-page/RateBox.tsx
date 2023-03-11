//Icons
import Star from "../../../../assets/icons/star";

//Types

//Models

//Libraries
import React from "react";

//Functions
import styles from "../../../style/app/recipe-page/rate-box.module.css";

//Components

interface PropsI {
	rate: number;
}

export default function RateBox({ rate }: PropsI) {
	return (
		<div className={styles.container}>
			<Star 
				width={20} 
				height={20}
			/>
			<p className={styles.rate}>{rate}</p>
		</div>
	);
}
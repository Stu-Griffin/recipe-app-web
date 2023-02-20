//Components

//Icons
import Star from "../../../assets/icons/star";

//Types

//Libraries
import React from "react";

//Functions
import styles from "../../style/reusable/rate-box.module.css";

//Models

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
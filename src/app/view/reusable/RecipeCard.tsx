//Components
import RateBox from "./RateBox";

//Icons

//Types

//Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

//Functions
import styles from "../../style/reusable/recipe-card.module.css";

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
			className={styles.container}
			style={{backgroundImage: `url(${image})`}}
		>
			<div className={styles.card}>
				<div className={styles.rate}>
					<RateBox
						rate={rate}
					/>
				</div>
				<div className={styles.info}>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.author}>{authorLogin}</p>
				</div>
			</div>
		</div>
	);
}
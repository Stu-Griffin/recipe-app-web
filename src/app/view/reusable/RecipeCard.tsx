//Icons

//Types
import { ReactElement } from "react";

//Models

//Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

//Functions
import styles from "../../style/reusable/recipe-card.module.css";

//Components
import RateBox from "../app/recipe-page/RateBox";

interface PropsI {
	id: string;
	rate: number; 
	image: string; 
	title: string; 
	authorLogin: string;
}

export default function RecipeCard({
	id,
	rate,
	image,
	title,
	authorLogin
}: PropsI): ReactElement {
	const navigate = useNavigate();

	const getTitle = (): string => {
		return (title?.length > 12) ? `${title.slice(0, 12)}...` : title;
	};

	return (
		<div 
			className={styles.container}
			onClick={() => navigate(`/recipe/${id}`)}
			style={{backgroundImage: `url(${image})`}}
		>
			<div className={styles.card}>
				<div className={styles.rate}>
					<RateBox
						rate={rate}
					/>
				</div>
				<div className={styles.info}>
					<h3 className={styles.title}>{getTitle()}</h3>
					<p className={styles.author}>{authorLogin}</p>
				</div>
			</div>
		</div>
	);
}
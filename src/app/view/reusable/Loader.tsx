//Icons

//Types
import { ReactElement } from "react";

//Models

//Libraries
import React from "react";
import Modal from "react-modal";
import { Puff } from  "react-loader-spinner";

//Functions
import styles from "../../style/reusable/loader.module.css";

//Components

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		border: "none",
		marginRight: "-50%",
		backgroundColor: "transparent",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement("#root");

interface PropsI {
	status: boolean;
	overlayClassSatus?: boolean;
}

export default function Loader({
	status,
	overlayClassSatus
}: PropsI): ReactElement {
	return (
		<Modal
			isOpen={status}
			style={customStyles}
			contentLabel="Modal"
			overlayClassName={(overlayClassSatus) ? styles.overlay : ""}
		>
			<Puff
				width="80"
				radius={1}
				height="80"
				color="#129575"
				visible={status}
				ariaLabel="puff-loading"
				wrapperClass={styles.loader}
			/>
		</Modal>
	);
}
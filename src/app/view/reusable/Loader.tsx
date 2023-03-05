//Components

//Icons

//Types

//Libraries

import React from "react";
import Modal from "react-modal";
import { Puff } from  "react-loader-spinner";

//Functions

//Models

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
}

export default function Loader({ status }: PropsI) {
	return (
		<Modal
			isOpen={status}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<Puff
				width="80"
				radius={1}
				height="80"
				color="#129575"
				visible={status}
				wrapperClass="loader"
				ariaLabel="puff-loading"
			/>
		</Modal>
	);
}
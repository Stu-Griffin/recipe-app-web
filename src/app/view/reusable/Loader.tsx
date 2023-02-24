//Components

//Icons

//Types
import { RootState } from "../../types/store";
import { AdditionalStateI } from "../../types/additional";

//Libraries

import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
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

export default function Loader() {
	const { loadingStatus }: AdditionalStateI = useSelector((state: RootState) => state.additional);

	return (
		<Modal
			style={customStyles}
			isOpen={loadingStatus}
			contentLabel="Example Modal"
		>
			<Puff
				width="80"
				radius={1}
				height="80"
				color="#129575"
				wrapperClass="loader"
				visible={loadingStatus}
				ariaLabel="puff-loading"
			/>
		</Modal>
	);
}
//Components

//Icons

//Types
import { ReactElement } from "react";

//Libraries
import React from "react";
import { useFlashMessages, removeFlashMessage } from "@42.nl/react-flash-messages";

//Functions

//Models

export default function FlashMessageComponent(): ReactElement {
	const flashMessages = useFlashMessages();

	return (
		<div>
			{flashMessages.map((flashMessage: any) => {
				return (
					<div
						key={flashMessage.id}
						className={`flash-message ${flashMessage.type}`}
						onClick={() => removeFlashMessage(flashMessage)}
					>
						<p>{flashMessage.text}</p>
						<p>{flashMessage.data}</p>
					</div>
				);
			})}
		</div>
	);
}
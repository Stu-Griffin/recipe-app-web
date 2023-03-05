//Icons

//Types

//Models

//Libraries
import React from "react";
import { Provider } from "react-redux";
import { FlashMessagesProvider } from "@42.nl/react-flash-messages";

//Functions
import { store } from "./app/controller/redux/store";

//Components
import Navigation from "./app/view/Navigation";
import FlashMessageComponent from "./app/view/reusable/FlashMessage";

export default function SignIn() {
	return (
		<Provider store={store}>
			<FlashMessagesProvider>
				<Navigation/>
				<FlashMessageComponent/>
			</FlashMessagesProvider>
		</Provider>
	);
}
//Components
import Navigation from "./app/view/Navigation";

//Icons

//Types

//Libraries
import React from "react";
import { Provider } from "react-redux";

//Functions
import { store } from "./app/controller/redux/store";

//Models

//Styles
import "./app/style/main.css";
import "./app/style/reusable.css";
import "./app/style/navigation.css";
import "./app/style/recipe-card.css";

export default function SignIn() {
	return (
		<Provider store={store}>
			<Navigation/>
		</Provider>
	);
}
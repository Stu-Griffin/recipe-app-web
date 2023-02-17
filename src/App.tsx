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
import "./app/style/style.css";
import "./app/style/reusable.css";

export default function SignIn() {
	return (
		<Provider store={store}>
			<Navigation/>
		</Provider>
	);
}
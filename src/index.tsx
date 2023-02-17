//Components
import App from "./App";

//Icons

//Types

//Libraries
import React from "react";
import ReactDOM from "react-dom/client";

//Functions
import reportWebVitals from "./reportWebVitals";

//Models

//Styles
import "./app/style/index.css";
import "./app/style/app/main.css";
import "./app/style/navigation.css";
import "./app/style/reusable/form.css";
import "./app/style/reusable/input.css";
import "./app/style/reusable/reusable.css";
import "./app/style/reusable/recipe-card.css";
import "./app/style/reusable/recipes-list.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();
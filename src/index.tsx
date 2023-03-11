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
import "./app/style/menu.css";
import "./app/style/index.css";
import "./app/style/recipe-list.css";
import "./app/style/flashMessage.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);

reportWebVitals();
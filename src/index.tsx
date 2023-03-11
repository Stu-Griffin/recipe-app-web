//Icons

//Types

//Styles
import "./app/style/index.css";
import "./app/style/animation/menu.css";
import "./app/style/animation/list-add-el.css";
import "./app/style/animation/recipe-card.css";
import "./app/style/animation/recipe-list.css";
import "./app/style/reusable/flash-message.css";

//Models

//Libraries
import React from "react";
import ReactDOM from "react-dom/client";

//Functions
import reportWebVitals from "./reportWebVitals";

//Components
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);

reportWebVitals();
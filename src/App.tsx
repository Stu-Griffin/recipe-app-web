//Icons

//Types
import { ReactElement } from "react";

//Models

//Libraries
import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";

//Functions
import { store } from "./app/controller/redux/store";

//Components
import Navigation from "./app/view/navigation";
import Loader from "./app/view/reusable/Loader";
import FlashMessageComponent from "./app/view/reusable/FlashMessage";

export default function App(): ReactElement {
	const [loadingStatus, setLoadingStatus] = useState<boolean>(true);

	useEffect(() => {
		const onPageLoad = () => {
			setTimeout(() => {
				setLoadingStatus(false);
			}, 2000);
		};

		if (document.readyState === "complete") {
			onPageLoad();
		} else {
			window.addEventListener("load", onPageLoad, false);
			return () => window.removeEventListener("load", onPageLoad);
		}
	}, []);

	return (
		<Provider store={store}>
			<Loader 
				status={loadingStatus} 
				overlayClassSatus={true}
			/>
			<Navigation/>
			<FlashMessageComponent/>
		</Provider>
	);
}
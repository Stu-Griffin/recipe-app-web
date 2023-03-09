//Icons

//Types

//Models

//Libraries
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { FlashMessagesProvider } from "@42.nl/react-flash-messages";

//Functions
import { store } from "./app/controller/redux/store";

//Components
import Navigation from "./app/view/Navigation";
import Loader from "./app/view/reusable/Loader";
import FlashMessageComponent from "./app/view/reusable/FlashMessage";

export default function SignIn() {
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
			<FlashMessagesProvider>
				<Loader 
					status={loadingStatus} 
					overlayClassSatus={true}
				/>
				<Navigation/>
				<FlashMessageComponent/>
			</FlashMessagesProvider>
		</Provider>
	);
}
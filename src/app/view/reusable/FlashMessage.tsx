//Components

//Icons

//Types
import { ReactElement, useEffect } from "react";
import { AppDispatch, RootState } from "../../types/store";

//Libraries
import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";

//Functions
import { changeFlashMessageShowStatus } from "../../controller/redux/flashMessage";

//Models

export default function FlashMessageComponent(): ReactElement {
	const nodeRef = useRef(null);
	const dispatch: AppDispatch = useDispatch();
	const {duration, status, message, description, show} = useSelector((state: RootState) => state.flashMessage);

	useEffect(() => {
		if(show && duration) {
			setTimeout(() => {
				closeFlashMessage();
			}, duration);
		}
	}, [show]);

	const closeFlashMessage = () => {
		dispatch(changeFlashMessageShowStatus(false));
	};

	return (
		<CSSTransition
			in={show}
			timeout={300}
			unmountOnExit
			nodeRef={nodeRef}
			classNames="alert"
		>
			<div
				ref={nodeRef}
				onClick={closeFlashMessage}
				className={`flash-message ${status}`}
			>
				<p>{message}</p>
				<p>{description}</p>
			</div>
		</CSSTransition>
	);
}
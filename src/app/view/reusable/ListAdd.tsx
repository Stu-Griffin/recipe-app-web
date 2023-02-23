//Components
import InputArea from "../reusable/Input";

//Icons
import DeleteIcon from "../../../assets/icons/delete";

//Types
import { ReactElement, useEffect } from "react";

//Libraries
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

//Functions
import { getButtonStyle } from "../../controller/style";
import styles from "../../style/reusable/list-add.module.css";
import { regularValidation } from "../../controller/validation";

//Models

interface PropsI {
	title: string;
	data: Array<string>;
	placeholder: string;
	saveEl: (value: string) => void;
	removeEl: (value: number) => void;
	moveEl: (what: number, where: number, el: string) => void;
}

function ListAdd({data, title, placeholder, saveEl, removeEl, moveEl}: PropsI): ReactElement {
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<boolean|null>(null);
	const [disabledStatus, setDisabledStatus] = useState<boolean>(true);

	useEffect(() => {
		setDisabledStatus((error === false) ? false : true);
	}, [error]);

	const onDragEnd = (result: DropResult): void => {
		if(result.destination) moveEl(result.source.index, result.destination.index, data[result.source.index]);
	};

	const action = (e: React.MouseEvent<HTMLElement>): void => {
		e.preventDefault();
		saveEl(value);
		setValue("");
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputArea}>
				<InputArea
					value={value}
					error={false}
					title={title}
					placeholder={placeholder}
					onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>): void => {
						setValue(e.target.value);
						setError(regularValidation(e.target.value));
					}}
				/>
				<button
					onClick={action}
					disabled={disabledStatus}
					className={styles.button}
					style={getButtonStyle(disabledStatus)} 
				>Add</button>
			</div>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="characters">
					{(provided) => {
						return (
							<div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
								{
									data.map((el: string, index: number): ReactElement => {
										return (
											<Draggable key={index} draggableId={`${index}`} index={index}>
												{(provided) => {
													return (
														<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={styles.element}>
															<p className={styles.text}>{el}</p>
															<DeleteIcon
																style={{
																	cursor: "pointer"
																}}
																width={22.5}
																height={22.5}
																onClick={(): void => {
																	removeEl(index);
																}}
															/>
														</div>
													);
												}}
											</Draggable>
										);
									})
								}
								{provided.placeholder}
							</div>
						);
					}}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default ListAdd;
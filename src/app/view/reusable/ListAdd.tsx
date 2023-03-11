//Components
import InputArea from "../reusable/Input";

//Icons
import SaveIcon from "../../../assets/icons/save";
import EditIcon from "../../../assets/icons/edit";
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
import { TransitionGroup, CSSTransition } from "react-transition-group";

//Models

interface PropsI {
	title: string;
	data: Array<string>;
	placeholder: string;
	listNumbering?: boolean;
	saveEl: (value: string) => void;
	removeEl: (value: number) => void;
	editEl: (value: string, id: number) => void;
	moveEl: (what: number, where: number, el: string) => void;
}

export default function ListAdd({editEl, listNumbering, data, title, placeholder, saveEl, removeEl, moveEl}: PropsI): ReactElement {
	const [value, setValue] = useState<string>("");
	const [editId, setEditId] = useState<string>("");
	const [editValue, setEditValue] = useState<string>("");
	const [error, setError] = useState<boolean|null>(null);
	const [editError, setEditError] = useState<boolean|null>(null);
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
		setError(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputArea}>
				<InputArea
					style={{
						width: "64%"
					}}
					value={value}
					error={false}
					title={title}
					multiple={true}
					placeholder={placeholder}
					onChangeFunc={(e: string): void => {
						setValue(e);
						setError(regularValidation(e));
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
								<TransitionGroup>
									{
										data.map((el: string, index: number): ReactElement => {
											return (
												<CSSTransition 
													key={index}
													timeout={500}
													classNames="el"
												>
													<Draggable key={index} draggableId={`${index}`} index={index}>
														{(provided) => {
															return (
																<div 
																	ref={provided.innerRef} 
																	className={styles.element}
																	{...provided.draggableProps} 
																	{...provided.dragHandleProps} 
																>
																	{(listNumbering) && <h2>{index+1}</h2>}
																	{
																		(editId === index.toString())
																			?
																			<InputArea
																				title=""
																				value={editValue}
																				style={{
																					width: "75%"
																				}}
																				multiple={true}
																				error={false}
																				placeholder=""
																				onChangeFunc={(e: string) => {
																					setEditValue(e);
																					setEditError(regularValidation(e));
																				}}
																			/>
																			:
																			<p className={styles.text}>{el}</p>
																	}
																	<div className={styles.elButtons}>
																		{
																			(editId === index.toString())
																				?
																				<SaveIcon
																					style={{
																						border: "none",
																						cursor: "pointer",
																						width: "25px",
																						height: "25px",
																						backgroundColor: "transparent",
																						...getButtonStyle(!!editError),
																					}}
																					width={25}
																					height={25}
																					onClick={(): void => {
																						setEditId("");
																						editEl(editValue, index);
																					}}
																				/>
																				:
																				<EditIcon
																					style={{
																						cursor: "pointer"
																					}}
																					width={30}
																					height={30}
																					onClick={(): void => {
																						setEditValue(el);
																						setEditId(index.toString());
																					}}
																				/>
																		}
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
																</div>
															);
														}}
													</Draggable>
												</CSSTransition>
											);
										})
									}
								</TransitionGroup>
								{provided.placeholder}
							</div>
						);
					}}
				</Droppable>
			</DragDropContext>
		</div>
	);
}
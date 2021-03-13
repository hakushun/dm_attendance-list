import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Program from './Program';
import {
	selectEvents,
	selectEventsIsLoading,
	updateEvents,
} from '../../redux/modules/events';
import { selectEvent, updateEvent } from '../../redux/modules/event';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const event = useSelector(selectEvent);
	const events = useSelector(selectEvents);
	const isLoading = useSelector(selectEventsIsLoading);
	const [programs, setPrograms] = useState<string[]>([]);

	useEffect(() => {
		setPrograms(event.programs);
	}, [event]);

	/**
	 * フォームに入力された値をstateに反映する関数
	 *
	 * @param e eventオブジェクト
	 */
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const index = parseInt(e.target.id.split('-')[1]);
			const statePrograms = [...programs];
			statePrograms.splice(index, 1, e.target.value);
			setPrograms(statePrograms);
		},
		[programs],
	);

	/**
	 * input formを１行追加する関数
	 *
	 * @param e eventオブジェクト
	 */
	const addProgramInput = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			if (programs && programs.length === 10) {
				window.alert('10曲が上限です');
				return;
			}
			const newPrograms = programs ? [...programs, ''] : [''];
			setPrograms(newPrograms);
		},
		[programs],
	);

	/**
	 * input formを１行削除する関数
	 *
	 * @param e eventオブジェクト
	 */
	const deleteProgramInput = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			if (programs && programs.length === 1) {
				window.alert('曲目は１曲以上必要です');
				return;
			}
			const newPrograms = programs ? [...programs] : [''];
			newPrograms.pop();
			setPrograms(newPrograms);
		},
		[programs],
	);

	/**
	 * フォームに入力された値をEvents stateに保存する関数
	 *
	 * @param e eventオブジェクト
	 */
	const registerPrograms = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			const programArray: HTMLInputElement[] = Array.from(
				document.querySelectorAll('[data-js=program]'),
			);
			const programValues = programArray.map((program) => program.value);
			if (programValues.some((value) => value === '')) {
				window.alert('未入力の項目があります');
				return;
			}
			dispatch(
				updateEvents({ event: { ...event, programs: programValues } }),
			);
		},
		[event],
	);

	/**
	 * programsの編集内容を破棄する関数
	 *
	 * @param e eventオブジェクト
	 */
	const cancelEdit = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			const targetEvent = events.find((evt) => evt.id === event.id);
			targetEvent &&
				dispatch(
					updateEvent({
						...targetEvent,
					}),
				);
		},
		[events, event],
	);

	return (
		<Program
			event={event}
			programs={programs}
			isLoading={isLoading}
			handleChange={handleChange}
			addProgramInput={addProgramInput}
			deleteProgramInput={deleteProgramInput}
			registerPrograms={registerPrograms}
			cancelEdit={cancelEdit}
		/>
	);
});

Component.displayName = 'Component';
export default Component;

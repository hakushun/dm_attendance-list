import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectEvents,
	selectEventsIsLoading,
	updateEvents,
} from '../../redux/modules/events';
import {
	Location,
	Plan,
	Remark,
	selectEvent,
	updateEvent,
} from '../../redux/modules/event';
import Practice from './Practice';
import {
	onClickButton,
	onChange,
	onChangeTextArea,
	onChangeOrTextArea,
} from '../../declarations/types';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const event = useSelector(selectEvent);
	const events = useSelector(selectEvents);
	const isLoading = useSelector(selectEventsIsLoading);
	const [localLocations, setLocalLocations] = useState<Location[]>([]);
	const [localPlans, setLocalPlans] = useState<Plan[]>([]);
	const [localRemarks, setLocalRemarks] = useState<Remark[]>([]);

	useEffect(() => {
		setLocalLocations(event.locations);
		setLocalPlans(event.plans);
		setLocalRemarks(event.remarks);
	}, [event]);

	/**
	 * クリックでアコーディオンを開閉する関数
	 *
	 * @param e イベントオブジェクト
	 */
	const toggleAccordion: onClickButton = useCallback((e) => {
		const target = e.target as HTMLButtonElement;
		const targetDay = target.getAttribute('data-js');
		const targetAccordion = document.querySelector(
			`#practice-${targetDay}`,
		) as HTMLElement;

		if (target.getAttribute('class')?.match('IsOpened')) {
			target.classList.remove('IsOpened');
			target.setAttribute('aria-expanded', 'false');
			targetAccordion.classList.remove('IsOpened');
			targetAccordion.setAttribute('aria-hidden', 'true');
		} else {
			target.classList.add('IsOpened');
			target.setAttribute('aria-expanded', 'true');
			targetAccordion.classList.add('IsOpened');
			targetAccordion.setAttribute('aria-hidden', 'false');
		}
	}, []);

	/**
	 * Locationsの入力内容を都度反映させる関数
	 *
	 * @param e イベントオブジェクト
	 */
	const handleChangeLocations: onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const targetKey = e.target.id.split('-')[0] as
				| 'name1'
				| 'name2'
				| 'url';
			const index = parseInt(e.target.id.split('-')[1]);
			const currentLocations = [...localLocations] as Location[];
			const targetLocation = currentLocations[index];
			const newLocation = {
				...targetLocation,
				[targetKey]: e.target.value,
			};
			currentLocations.splice(index, 1, newLocation);
			setLocalLocations(currentLocations);
		},
		[localLocations],
	);

	/**
	 * Plansの入力内容を都度反映させる関数
	 *
	 * @param e イベントオブジェクト
	 */
	const handleChangePlans: onChangeOrTextArea = useCallback(
		(e) => {
			const targetKey = e.target.id.split('-')[0] as
				| 'category'
				| 'schedule';
			const index = parseInt(e.target.id.split('-')[1]);
			const currentPlans = [...localPlans];
			const targetPlan = currentPlans[index];
			const newPlan = { ...targetPlan, [targetKey]: e.target.value };
			currentPlans.splice(index, 1, newPlan);
			setLocalPlans(currentPlans);
		},
		[localPlans],
	);

	/**
	 * Remarkssの入力内容を都度反映させる関数
	 *
	 * @param e イベントオブジェクト
	 */
	const handleChangeRemarks: onChangeTextArea = useCallback(
		(e) => {
			const targetKey = e.target.id.split('-')[0] as 'contents';
			const index = parseInt(e.target.id.split('-')[1]);
			const currentRemarks = [...localRemarks];
			const targetRemark = currentRemarks[index];
			const newRemark = { ...targetRemark, [targetKey]: e.target.value };
			currentRemarks.splice(index, 1, newRemark);
			setLocalRemarks(currentRemarks);
		},
		[localRemarks],
	);

	/**
	 * フォームに入力された値をEvents stateに保存する関数
	 *
	 * @param e eventオブジェクト
	 */
	const registerPractice: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(
				updateEvents({
					event: {
						...event,
						locations: localLocations,
						plans: localPlans,
						remarks: localRemarks,
					},
				}),
			);
		},
		[event, localLocations, localPlans, localRemarks],
	);

	/**
	 * 編集内容を破棄する関数
	 *
	 * @param e eventオブジェクト
	 */
	const cancelEdit: onClickButton = useCallback(
		(e) => {
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
		<Practice
			event={event}
			isLoading={isLoading}
			localLocations={localLocations}
			localPlans={localPlans}
			localRemarks={localRemarks}
			toggleAccordion={toggleAccordion}
			handleChangeLocations={handleChangeLocations}
			handleChangePlans={handleChangePlans}
			handleChangeRemarks={handleChangeRemarks}
			registerPractice={registerPractice}
			cancelEdit={cancelEdit}
		/>
	);
});

Component.displayName = 'Component';
export default Component;

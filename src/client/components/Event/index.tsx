import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Event from './Event';
import EventHeader from './EventHeader';
import EventList from './EventList';
import { toggleEventFormIsShown } from '../../redux/modules/boolean';
import {
	updateEvents,
	selectEvents,
	createEvent,
	removeEvent,
	selectEventsState,
	selectEventsIsLoading,
} from '../../redux/modules/events';
import {
	initiateEvent,
	updateEvent,
	initialDay,
	initialTime,
	selectEvent,
} from '../../redux/modules/event';
import {
	onClickButton,
	onChange,
	onClickAncor,
} from '../../declarations/types';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const event = useSelector(selectEvent);
	const events = useSelector(selectEvents);
	const isLoading = useSelector(selectEventsIsLoading);
	const eventsState = useSelector(selectEventsState);
	const [title, setTitle] = useState<string>('');
	const [detail, setDetail] = useState<string>('');
	const [days, setDays] = useState<string[]>([]);
	const [times, setTimes] = useState<string[]>([]);

	useEffect(() => {
		setTitle(event.title);
		setDetail(event.detail);
		setDays(event.days);
		setTimes(event.times);
	}, [event]);

	/**
	 * フォーム入力された日付を都度stateに反映する関数
	 *
	 * @param e eventオブジェクト
	 */
	const handleChangeDay: onChange = useCallback(
		(e) => {
			const index = parseInt(e.target.id.split('-')[1]);
			const targetDate = e.target.value;
			const stateDays = [...days];
			stateDays.splice(index, 1, targetDate);
			setDays(stateDays);
		},
		[days],
	);

	/**
	 * フォーム入力された時間を都度stateに反映する関数
	 *
	 * @param e eventオブジェクト
	 */
	const handleChangeTime: onChange = useCallback(
		(e) => {
			const index = parseInt(e.target.id.split('-')[1]);
			const targetTime = e.target.value;
			const stateTimes = [...times];
			stateTimes.splice(index, 1, targetTime);
			setTimes(stateTimes);
		},
		[times],
	);

	/**
	 * Eventを編集するフォームを表示する関数
	 *
	 * @param e eventオブジェクト
	 */
	const editEventForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(toggleEventFormIsShown(true));
		},
		[dispatch],
	);

	/**
	 * 日付と時間の入力フォームを追加する関数
	 *
	 * @param e eventオブジェクト
	 */
	const addEventForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (days.length === 30 || times.length === 30) {
				window.alert('日時の上限数は30です');
				return;
			}
			const stateDays = [...days];
			const stateTimes = [...times];
			stateDays.push(initialDay());
			stateTimes.push(initialTime);
			setDays(stateDays);
			setTimes(stateTimes);
		},
		[days, times],
	);

	/**
	 * 日付と時間の入力フォームを削除する関数
	 *
	 * @param e eventオブジェクト
	 * @returns
	 */
	const deleteEventForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (days.length === 1 || times.length === 1) {
				window.alert('イベントの登録には日時が一つ以上必要です');
				return;
			}
			const stateDays = [...days];
			const stateTimes = [...times];
			stateDays.pop();
			stateTimes.pop();
			setDays(stateDays);
			setTimes(stateTimes);
		},
		[days, times],
	);

	/**
	 * フォームに入力された値をEvents stateに保存する関数
	 *
	 * @param e eventオブジェクト
	 */
	const registerEvent: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (title === '') {
				window.alert('イベント名を入力してください');
				return;
			}
			if (days.some((day) => day === '')) {
				window.alert('日付が未入力です');
				return;
			}
			if (times.some((time) => time === '')) {
				window.alert('時間が未入力です');
				return;
			}
			if (event.id === 0) {
				dispatch(
					createEvent({
						event: {
							...event,
							id: 0,
							title,
							detail,
							days,
							times,
						},
					}),
				);
			}
			if (event.id > 0) {
				dispatch(
					updateEvents({
						event: { ...event, title, detail, days, times },
					}),
				);
			}
		},
		[title, detail, days, times, event],
	);

	/**
	 * 編集内容を破棄する関数
	 *
	 * @param e eventオブジェクト
	 */
	const cancelEvent: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (event.id === 0) {
				dispatch(initiateEvent());
				return;
			}
			if (event.id > 0) {
				const targetEvent = events.find((evt) => evt.id === event.id);
				targetEvent &&
					dispatch(
						updateEvent({
							...targetEvent,
						}),
					);
			}
		},
		[event, events],
	);

	/**
	 * Eventを削除する関数
	 *
	 * @param e eventオブジェクト
	 */
	const deleteEvent: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (
				window.confirm(
					`本当に${event.title}を削除しますか？\n出欠が登録されている場合、そのデータも消えます。`,
				)
			) {
				dispatch(removeEvent(event.id));
			}
		},
		[event],
	);

	/**
	 * クリックしたイベントをEvent stateに反映させる関数
	 *
	 * @param e eventオブジェクト
	 */
	const handleSelectEvent: onClickAncor = useCallback(
		(e) => {
			e.preventDefault();
			const index = parseInt(e.currentTarget.id.split('-')[1]);
			const targetEvent = events.find((evt) => evt.id === index);
			targetEvent &&
				dispatch(
					updateEvent({
						...targetEvent,
					}),
				);
		},
		[events],
	);

	return (
		<>
			<Event
				event={event}
				title={title}
				detail={detail}
				days={days}
				times={times}
				isLoading={isLoading}
				setTitle={setTitle}
				setDetail={setDetail}
				handleChangeDay={handleChangeDay}
				handleChangeTime={handleChangeTime}
				editEventForm={editEventForm}
				addEventForm={addEventForm}
				deleteEventForm={deleteEventForm}
				registerEvent={registerEvent}
				cancelEvent={cancelEvent}
				deleteEvent={deleteEvent}
			/>
			<EventList
				events={events}
				eventsState={eventsState}
				selectEvent={handleSelectEvent}
			/>
			{event.id > 0 && <EventHeader event={event} />}
		</>
	);
});

Component.displayName = 'Component';
export default Component;

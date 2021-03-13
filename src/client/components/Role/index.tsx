import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvents } from '../../redux/modules/events';
import { selectEvent, updateEvent } from '../../redux/modules/event';
import { User } from '../../redux/modules/user';
import Role from './Role';
import './Role.css';
import { onClickButton, onChange } from '../../declarations/types';
import { selectParts } from '../../redux/modules/parts';
import {
	selectUsers,
	selectUsersIsLoading,
	updateRoles,
} from '../../redux/modules/users';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const parts = useSelector(selectParts);
	const event = useSelector(selectEvent);
	const events = useSelector(selectEvents);
	const users = useSelector(selectUsers);
	const isLoading = useSelector(selectUsersIsLoading);
	const [localUsers, setLocalUsers] = useState<User[]>([]);

	useEffect(() => {
		setLocalUsers(users);
	}, [event]);

	/**
	 * クリックでアコーディオンを開閉する関数
	 *
	 * @param e イベントオブジェクト
	 */
	const toggleAccordion: onClickButton = useCallback((e) => {
		const target = e.target as HTMLButtonElement;
		const targetPart = target.getAttribute('data-js');
		const targetAccordion = document.querySelector(
			`#${targetPart}-accordion`,
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
	 * 入力された値をstateに反映させる関数
	 *
	 * @param e イベントオブジェクト
	 */
	const handleChange: onChange = useCallback(
		(e) => {
			const progradios = Array.from(
				document.querySelectorAll('[data-js=progradio]'),
			) as HTMLInputElement[];
			const program = progradios.find(
				(progradio) => progradio.checked === true,
			);
			const targetInput = e.target as HTMLInputElement;
			const targetUserId = parseInt(targetInput.id.split('-')[1]);
			const targetUser = localUsers.find(
				(user) => user.id === targetUserId,
			);
			const nonTargetUsers = localUsers.filter(
				(user) => targetUser && user.id !== targetUser.id,
			);
			program &&
				targetUser &&
				setLocalUsers([
					...nonTargetUsers,
					{
						...targetUser,
						role: {
							...targetUser.role,
							[program.value]: targetInput.value,
						},
					},
				]);
		},
		[localUsers],
	);

	/**
	 * 入力された乗り番をevents stateに登録する関数
	 *
	 * @param e イベントオブジェクト
	 */
	const updateRole: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(updateRoles({ eventId: event.id, users: localUsers }));
		},
		[event, localUsers],
	);

	/**
	 * 乗り番の登録をキャンセルする関数
	 *
	 * @param e イベントオブジェクト
	 */
	const cancelRole: onClickButton = useCallback(
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
		<Role
			parts={parts}
			event={event}
			users={users}
			isLoading={isLoading}
			localUsers={localUsers}
			toggleAccordion={toggleAccordion}
			handleChange={handleChange}
			updateRole={updateRole}
			cancelRole={cancelRole}
		/>
	);
});

Component.displayName = 'Component';
export default Component;

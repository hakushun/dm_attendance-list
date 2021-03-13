import React, { useEffect, useState, useCallback } from 'react';
import CovidForm from './CovidForm';
import { useSelector, useDispatch } from 'react-redux';
import { User, initialState } from '../../redux/modules/user';
import { selectEvent } from '../../redux/modules/event';
import { toggleCovidFormIsShown } from '../../redux/modules/boolean';
import { onClickButton } from '../../declarations/types';
import { selectParts } from '../../redux/modules/parts';
import {
	selectCovidsIsLoading,
	updateCovids,
} from '../../redux/modules/covids';
import { selectUsers } from '../../redux/modules/users';

const Component = React.memo(
	(): JSX.Element => {
		const dispatch = useDispatch();
		const parts = useSelector(selectParts);
		const event = useSelector(selectEvent);
		const users = useSelector(selectUsers);
		const covidsIsLoading = useSelector(selectCovidsIsLoading);
		const [userParts, setUserParts] = useState<string[]>([]);
		const [selectedPart, setSelectedPart] = useState<string>('0');
		const [matchedUsers, setMatchedUsers] = useState<User[]>([
			initialState,
		]);
		const [selectedUser, setSelectedUser] = useState<string>('0');
		const [selectedDate, setSelectedDate] = useState<string>('0');
		const [answers, setAnswers] = useState<{ [s: string]: string }>({
			q1: 'no',
			q2: 'no',
			q3: 'no',
		});

		/**
		 * usersから各userのpartを取得し配列にする関数
		 * @param users
		 */
		const partToArray = useCallback((usrs: User[]): string[] => {
			const partsArray: string[] = [];
			if (usrs) {
				usrs.forEach((user) => {
					partsArray.push(user.part);
				});
			}
			return partsArray;
		}, []);

		/**
		 * 配列の要素から重複をなくす関数
		 * @param array
		 */
		const arrayUnique = useCallback((array: string[]) => {
			return array.filter((value, index) => {
				return index === array.indexOf(value);
			});
		}, []);

		/**
		 * covid formを表示する関数
		 */
		const showCovidForm: onClickButton = useCallback(
			(e) => {
				e.preventDefault();
				dispatch(toggleCovidFormIsShown(true));
			},
			[dispatch],
		);

		/**
		 * 入力された内容が有効か判断し、回答を登録する関数
		 */
		const registerAnswers: onClickButton = useCallback(
			(e) => {
				e.preventDefault();
				if (selectedPart === '0') {
					window.alert('パートを選択してください');
					return;
				}
				if (selectedUser === '0') {
					window.alert('名前を選択してください');
					return;
				}
				if (selectedDate === '0') {
					window.alert('日付を選択してください');
					return;
				}
				dispatch(
					updateCovids({
						eventId: event.id,
						response: {
							userId: parseInt(selectedUser),
							date: selectedDate,
							answers,
							timestamp: Date.now(),
						},
					}),
				);
				setSelectedPart('0');
				setSelectedUser('0');
				setSelectedDate('0');
				setAnswers({
					q1: 'no',
					q2: 'no',
					q3: 'no',
				});
			},
			[selectedPart, selectedUser, selectedDate, event],
		);

		/**
		 * 入力内容を破棄する関数
		 */
		const cancelAnswers: onClickButton = useCallback(
			(e) => {
				e.preventDefault();
				setSelectedPart('0');
				setSelectedUser('0');
				setSelectedDate('0');
				setAnswers({
					q1: 'no',
					q2: 'no',
					q3: 'no',
				});
				dispatch(toggleCovidFormIsShown(false));
			},
			[dispatch],
		);

		// usersの変更の度、users要素のpartのみを取得し配列に変換
		useEffect(() => {
			const targetParts = parts.filter((p) => {
				return arrayUnique(partToArray(users)).find((item) => {
					return p === item;
				});
			});
			setUserParts(targetParts);
		}, [users]);

		// 選択されたpartに該当するuserを取得する
		useEffect(() => {
			setMatchedUsers(users.filter((user) => user.part === selectedPart));
		}, [selectedPart]);

		return (
			<>
				{event.id > 0 && (
					<CovidForm
						covidsIsLoading={covidsIsLoading}
						event={event}
						userParts={userParts}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						matchedUsers={matchedUsers}
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						answers={answers}
						setAnswers={setAnswers}
						showCovidForm={showCovidForm}
						registerAnswers={registerAnswers}
						cancelAnswers={cancelAnswers}
					/>
				)}
			</>
		);
	},
);

Component.displayName = 'Component';
export default Component;

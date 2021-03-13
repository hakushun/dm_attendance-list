import React, { useState, useEffect, useCallback } from 'react';
import CovidTable from './CovidTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectEvent } from '../../redux/modules/event';
import { User as typeUser } from '../../redux/modules/user';
import {
	selectCovidTableIsShown,
	toggleCovidTableIsShown,
} from '../../redux/modules/boolean';
import { onClickButton } from '../../declarations/types';
import {
	Response as typeResponse,
	selectResponses,
} from '../../redux/modules/covids';
import { selectUsers } from '../../redux/modules/users';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const covidTableIsShown = useSelector(selectCovidTableIsShown);
	const event = useSelector(selectEvent);
	const users = useSelector(selectUsers);
	const responses = useSelector(selectResponses);
	const [localData, setLocalData] = useState<typeResponse[]>(responses);
	const [targetData, setTargetData] = useState<typeResponse[]>(responses);
	const [selectedDate, setSelectedDate] = useState<string>('0');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [attendUsers, setAttendUsers] = useState<typeUser[]>([]);
	const [unansweredUsers, setUnansweredUsers] = useState<typeUser[]>([]);

	useEffect(() => {
		setLocalData(responses);
	}, [responses]);

	// 選ばれた日付に出席するメンバーをattendUsersに格納する
	useEffect(() => {
		const index = event.days.findIndex((d) => d === selectedDate);
		const targetUsers =
			users &&
			users.filter(
				(u) =>
					u.attendances[index] === '○' ||
					u.attendances[index] === '△',
			);
		setAttendUsers(targetUsers);
	}, [users, selectedDate]);

	// 選ばれた日付と同じ日付で回答したアンケートデータをtargetDataに格納する
	useEffect(() => {
		const filterdData =
			localData &&
			localData.filter((data) => {
				return data.date === selectedDate;
			});
		setTargetData(filterdData);
	}, [localData, selectedDate]);

	// 出席予定者と回答者を比べて未回答者をunansweredUsersに格納する
	useEffect(() => {
		if (selectedCategory === 'unanswered') {
			const usrs =
				attendUsers &&
				attendUsers.filter((u) => {
					return (
						targetData &&
						!targetData.find((d) => {
							return d.userId === u.id;
						})
					);
				});
			setUnansweredUsers(usrs);
			return;
		}
	}, [selectedCategory, attendUsers, targetData]);

	/**
	 * covid tableを表示する関数
	 */
	const showCovidTable: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(toggleCovidTableIsShown(true));
		},
		[dispatch],
	);

	/**
	 * covid tableを非表示にする関数
	 */
	const closeCovidTable: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			setSelectedDate('0');
			setSelectedCategory('');
			setUnansweredUsers([]);
			dispatch(toggleCovidTableIsShown(false));
		},
		[dispatch],
	);
	return (
		<>
			{event.id > 0 && (
				<CovidTable
					covidTableIsShown={covidTableIsShown}
					event={event}
					users={users}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					targetData={targetData}
					unansweredUsers={unansweredUsers}
					showCovidTable={showCovidTable}
					closeCovidTable={closeCovidTable}
				/>
			)}
		</>
	);
});

Component.displayName = 'Component';
export default Component;

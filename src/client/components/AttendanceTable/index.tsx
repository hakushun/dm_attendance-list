import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleAttendanceFormIsShown,
	toggleModalIsShown,
} from '../../redux/modules/boolean';
import { updateUser } from '../../redux/modules/user';
import { updateAttendance } from '../../redux/modules/attendance';
import AttendanceTable from './AttendanceTable';
import './AttendanceTable.css';
import {
	AddPrefix,
	onClickCell,
	onClickAncor,
	HighlightRow,
	onClickButton,
} from '../../declarations/types';
import { selectParts } from '../../redux/modules/parts';
import { selectEvent } from '../../redux/modules/event';
import { selectUsers } from '../../redux/modules/users';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const parts = useSelector(selectParts);
	const event = useSelector(selectEvent);
	const users = useSelector(selectUsers);
	const [selectedProgram, setSelectedProgram] = useState<string>('0');

	/**
	 * parts stateの要素それぞれに通し番号を付与する関数
	 *
	 * @param name
	 * @returns string
	 */
	const addPrefix: AddPrefix = useCallback(
		(name) => {
			const index = parts.findIndex((part) => part === name);
			if (index < 10) {
				return `0${index}_${name}`;
			}
			return `${index}_${name}`;
		},
		[parts],
	);

	/**
	 * 出欠編集フォームを表示する関数
	 *
	 * @param e eventオブジェクト
	 */
	const editAttendance: onClickAncor = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			const target = e.target as HTMLElement;
			const index = parseInt(target.id.split('-')[1]);
			const targetUser = users.find((user) => user.id === index);
			targetUser && dispatch(updateUser(targetUser));
			dispatch(toggleAttendanceFormIsShown(true));
		},
		[users],
	);

	/**
	 * クリックした行をハイライトさせる関数
	 *
	 * @param e eventオブジェクト
	 */
	const highlightRow: HighlightRow = useCallback((e) => {
		e.currentTarget.classList.toggle('Highlight');
	}, []);

	/**
	 * 出欠人数を計算する関数
	 *
	 * @param e eventオブジェクト
	 */
	const countAttendance: onClickCell = useCallback(
		(e) => {
			const currentTarget = e.currentTarget as HTMLElement;
			const target = e.target as HTMLElement;
			dispatch(updateAttendance({ currentTarget, target }));
		},
		[dispatch],
	);

	/**
	 * モーダルを開く関数
	 *
	 * @param e eventオブジェクト
	 */
	const openModal: onClickCell = useCallback(
		(e) => {
			e.preventDefault();
			countAttendance(e);
			dispatch(toggleModalIsShown(true));
		},
		[countAttendance],
	);

	/**
	 * コメントを表示させる関数
	 *
	 * @param e eventオブジェクト
	 */
	const toggleBaloon: onClickAncor = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		const target = e.target as HTMLElement;
		if (
			target.nextElementSibling &&
			window
				.getComputedStyle(target.nextElementSibling, null)
				.getPropertyValue('display') === 'none'
		) {
			(target.nextElementSibling as HTMLElement).style.display = 'block';
			return;
		}
		(target.nextElementSibling as HTMLElement).style.display = 'none';
	}, []);

	/**
	 * 出欠登録後、表の行をパート順に並び替える関数
	 *
	 */
	const sort = useCallback(() => {
		const tbody = document.getElementById('tbody')!;
		const rows = Array.from(
			document.querySelectorAll('[data-js=attendance-rows]'),
		);

		rows.sort((a, b) => {
			const _a = a.children[0].getAttribute('data-js');
			const _b = b.children[0].getAttribute('data-js');
			if (_a && _b && _a < _b) {
				return -1;
			}
			if (_a && _b && _a > _b) {
				return 1;
			}
			return 0;
		});

		// テーブルから要素を一旦削除
		while (tbody.firstChild) {
			tbody && tbody.removeChild(tbody.firstChild);
		}

		// 並び替えた要素を配置
		rows.forEach((row) => {
			tbody && tbody.appendChild(row);
		});
	}, []);

	/**
	 * テーブルの名前を曲ごとのパート名に表示を切り替える関数
	 *
	 */
	const changeDisplayName = useCallback(() => {
		const options = Array.from(
			(document.querySelector('#select_program') as HTMLSelectElement)
				.options,
		);
		const selectedOption = options.find((opt) => opt.selected);
		selectedOption && setSelectedProgram(selectedOption.value);
	}, [event]);

	/**
	 * 特定の列を非表示にする関数
	 *
	 * @param e イベントオブジェクト
	 */
	const hideColumns: onClickButton = useCallback((e) => {
		e.preventDefault();
		const target = e.target as HTMLButtonElement;
		const targerIndex = parseInt(
			target.getAttribute('data-js')!.split('-')[1],
		);
		const targetDay = document.querySelector(
			`[data-js=day-${targerIndex}]`,
		);
		const targetTime = document.querySelector(
			`[data-js=time-${targerIndex}]`,
		);
		const targetAttendances = document.querySelectorAll(
			`[data-js=attendance-cell-${targerIndex}]`,
		);

		target.parentElement && target.parentElement.classList.add('isHidden');
		targetDay && targetDay.classList.add('isHidden');
		targetTime && targetTime.classList.add('isHidden');
		targetAttendances.forEach((elm) => {
			elm.classList.add('isHidden');
		});
	}, []);

	/**
	 * 非表示にされた列を表示する関数
	 *
	 * @param e イベントオブジェクト
	 */
	const showAllColumns: onClickButton = useCallback((e) => {
		e.preventDefault();
		const table = document.getElementById(
			'attendance_table_xlsx',
		) as HTMLTableElement;
		const hiddenCells = table.querySelectorAll('.isHidden');
		hiddenCells.forEach((cell) => {
			cell.classList.remove('isHidden');
		});
	}, []);

	useEffect(() => {
		if (users && users.length > 0) {
			sort();
		}
	});

	return (
		<>
			{event.id > 0 && (
				<AttendanceTable
					event={event}
					users={users}
					selectedProgram={selectedProgram}
					addPrefix={addPrefix}
					editAttendance={editAttendance}
					highlightRow={highlightRow}
					openModal={openModal}
					toggleBaloon={toggleBaloon}
					changeDisplayName={changeDisplayName}
					hideColumns={hideColumns}
					showAllColumns={showAllColumns}
				/>
			)}
		</>
	);
});

Component.displayName = 'Component';
export default Component;

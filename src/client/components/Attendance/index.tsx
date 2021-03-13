import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Attendance from './Attendance';
import {
	updateUser,
	selectUser,
	changeUser,
	initiateUser,
} from '../../redux/modules/user';
import {
	createUsers,
	deleteUsers,
	selectUsersIsLoading,
	updateUsers,
} from '../../redux/modules/users';
import { selectEvent } from '../../redux/modules/event';
import {
	onClickButton,
	onClickRadioGroup,
	onKeyDownRadioGroup,
} from '../../declarations/types';
import { selectParts } from '../../redux/modules/parts';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const parts = useSelector(selectParts);
	const event = useSelector(selectEvent);
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectUsersIsLoading);

	/**
	 * フォームに入力された値を都度User stateに反映する関数
	 *
	 * @param e eventオブジェクト
	 */
	const handleChange = useCallback(
		(
			e: React.ChangeEvent<
				HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
			>,
		) => {
			if (e.target.name === 'remark') {
				const remarks = Array.from(
					document.querySelectorAll('[data-js=remark]'),
				) as HTMLInputElement[];
				const remarkValues = remarks.map((remark) => remark.value);
				dispatch(changeUser({ name: 'remarks', value: remarkValues }));
				return;
			}
			dispatch(
				changeUser({ name: e.target.name, value: e.target.value }),
			);
		},
		[dispatch],
	);

	/**
	 * 出欠入力フォームを表示する関数
	 *
	 * @param e eventオブジェクト
	 */
	const showAttendanceForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(initiateUser(event));
		},
		[event],
	);

	/**
	 * フォームに入力された値をstateに保存する関数
	 *
	 * @param e eventオブジェクト
	 */
	const registerAttendance: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (!user.part) {
				window.alert('パートを選択してください。');
				return;
			}
			if (!user.name) {
				window.alert('名前を入力してください。');
				return;
			}
			dispatch(
				createUsers({
					eventId: event.id,
					user: { ...user },
				}),
			);
		},
		[user, event],
	);

	/**
	 * 出欠を更新する関数
	 *
	 * @param e eventオブジェクト
	 */
	const updateAttendance: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (!user.name) {
				window.alert('名前を入力してください。');
				return;
			}
			dispatch(
				updateUsers({
					eventId: event.id,
					user: { ...user },
				}),
			);
		},
		[user, event],
	);

	/**
	 * 登録されている出欠を削除する関数
	 *
	 * @param e eventオブジェクト
	 */
	const deleteAttendance: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(deleteUsers({ eventId: event.id, userId: user.id }));
		},
		[event, user],
	);

	/**
	 * 編集内容を破棄する関数
	 *
	 * @param e eventオブジェクト
	 */
	const cancelAttendance: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(initiateUser(event));
		},
		[event],
	);

	/**
	 * ラジオボタン関連の要素を取得し、返す関数
	 *
	 * @param e eventオブジェクト
	 * @return radio, radioes, checkedIndex
	 */
	const getRadioEls = useCallback(
		(
			e:
				| React.MouseEvent<HTMLSpanElement, MouseEvent>
				| React.KeyboardEvent<HTMLSpanElement>,
		) => {
			const radio = e.target as HTMLElement;
			const targetRadiogroup = radio.parentElement as HTMLElement;
			const radioes = Array.from(
				targetRadiogroup.querySelectorAll('[role="radio"]'),
			) as HTMLElement[];
			const checkedIndex = radioes.findIndex(
				(radioItem) =>
					radioItem.getAttribute('aria-checked') === 'true',
			);

			return { radio, targetRadiogroup, radioes, checkedIndex };
		},
		[],
	);

	/**
	 * ラジオグループのaria-activedescendantを変更する関数
	 *
	 * @param ラジオグループ
	 * @param 選択されたラジオボタン
	 */
	const setActivedescendant = useCallback(
		(rg: HTMLElement, elm: HTMLElement) => {
			rg.setAttribute('aria-activedescendant', elm.id);
		},
		[],
	);

	/**
	 * 要素にaria-checked=true、tabindex=0、focusを設定する関数
	 *
	 * @param HTMLElement
	 */
	const addChecked = useCallback((elm: HTMLElement) => {
		elm.setAttribute('aria-checked', 'true');
		elm.setAttribute('tabindex', '0');
		elm.focus();
	}, []);

	/**
	 * 全ての要素にaria-checked=false、tabindex=-1を設定する関数
	 *
	 * @param HTMLElement[]
	 */
	const removeChecked = useCallback((array: HTMLElement[]) => {
		array.forEach((item) => {
			item.setAttribute('aria-checked', 'false');
			item.setAttribute('tabindex', '-1');
		});
	}, []);

	/**
	 * 変更内容をstateに反映する関数
	 *
	 */
	const radioChangeHandler = useCallback(() => {
		const attendances = Array.from(
			document.querySelectorAll('[data-js=attendance]'),
		) as HTMLInputElement[];
		const attendanceChecked = attendances.filter(
			(attend) => attend.getAttribute('aria-checked') === 'true',
		);
		const attendanceValues = attendanceChecked.map(
			(attend) => attend.textContent,
		) as string[];
		dispatch(updateUser({ ...user, attendances: attendanceValues }));
	}, [user]);

	/**
	 * ラジオボタンがクリックされたとき発火する関数
	 *
	 * @param eventオブジェクト
	 */
	const clickRadioGroup: onClickRadioGroup = useCallback(
		(e) => {
			const { radio, targetRadiogroup, radioes } = getRadioEls(e);
			removeChecked(radioes);
			addChecked(radio);
			setActivedescendant(targetRadiogroup, radio);
			radioChangeHandler();
		},
		[removeChecked, addChecked, setActivedescendant, radioChangeHandler],
	);

	/**
	 * ラジオボタンをキーボード操作できるようにする関数
	 *
	 * @param eventオブジェクト
	 */
	const keyDownRadioGroup: onKeyDownRadioGroup = useCallback(
		(e) => {
			const { targetRadiogroup, radioes, checkedIndex } = getRadioEls(e);

			switch (e.keyCode) {
				case 39: // RIGHT
				case 40: // DOWN
					if (checkedIndex < radioes.length - 1) {
						e.preventDefault();
						removeChecked(radioes);
						addChecked(radioes[checkedIndex + 1]);
						setActivedescendant(
							targetRadiogroup,
							radioes[checkedIndex + 1],
						);
					}
					break;
				case 37: // LEFT
				case 38: // UP
					if (checkedIndex > 0) {
						e.preventDefault();
						removeChecked(radioes);
						addChecked(radioes[checkedIndex - 1]);
						setActivedescendant(
							targetRadiogroup,
							radioes[checkedIndex - 1],
						);
					}
					break;
				default:
					radioChangeHandler();
					break;
			}
		},
		[removeChecked, addChecked, setActivedescendant, radioChangeHandler],
	);

	return (
		<>
			{event.id > 0 && (
				<Attendance
					parts={parts}
					event={event}
					user={user}
					isLoading={isLoading}
					handleChange={handleChange}
					showAttendanceForm={showAttendanceForm}
					registerAttendance={registerAttendance}
					updateAttendance={updateAttendance}
					deleteAttendance={deleteAttendance}
					cancelAttendance={cancelAttendance}
					clickRadioGroup={clickRadioGroup}
					keyDownRadioGroup={keyDownRadioGroup}
				/>
			)}
		</>
	);
});

Component.displayName = 'Component';
export default Component;

import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSettingFormIsShown } from '../../redux/modules/boolean';
import {
	selectParts,
	selectPartsIsLoading,
	updateParts,
} from '../../redux/modules/parts';
import Part from './Part';
import { onChange, onClickButton, MovePart } from '../../declarations/types';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const parts = useSelector(selectParts);
	const isLoading = useSelector(selectPartsIsLoading);
	const [localParts, setLocalParts] = useState<string[]>(parts);

	/**
	 * フォームに入力された値を都度stateに反映する関数
	 *
	 * @param e eventオブジェクト
	 */
	const handleChange: onChange = useCallback(
		(e) => {
			const index = parseInt(e.target.id.split('-')[1]);
			const stateParts = [...localParts];
			stateParts.splice(index, 1, e.target.value);
			setLocalParts(stateParts);
		},
		[localParts],
	);

	/**
	 * input formの順番を入れ替える関数
	 *
	 * @param e eventオブジェクト
	 * @param dir -1 or 1
	 */
	const movePart: MovePart = useCallback(
		(e, dir) => {
			e.preventDefault();
			const target = e.target as HTMLElement;
			const index = parseInt(
				target.getAttribute('data-js')!.split('-')[1],
			);
			const targetPart = localParts[index];
			const swapPart = localParts[index + dir];
			const stateParts = [...localParts];
			if (
				(index === 0 && dir < 0) ||
				(index === localParts.length - 1 && 0 < dir)
			) {
				return;
			}
			stateParts.splice(index, 1, swapPart);
			stateParts.splice(index + dir, 1, targetPart);
			setLocalParts(stateParts);
		},
		[localParts],
	);

	/**
	 * input formを１行追加する関数
	 *
	 * @param e eventオブジェクト
	 */
	const addPartForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (localParts.length === 30) {
				window.alert('30パートが上限です');
				return;
			}
			const newParts = [...localParts, ''];
			setLocalParts(newParts);
		},
		[localParts],
	);

	/**
	 * input formを１行削除する関数
	 *
	 * @param e eventオブジェクト
	 */
	const deletePartForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			if (localParts.length === 1) {
				window.alert('パートは一つ以上必要です');
				return;
			}
			const newParts = [...localParts];
			newParts.pop();
			setLocalParts(newParts);
		},
		[localParts],
	);

	/**
	 * フォームに入力された値をParts stateに保存する関数
	 *
	 * @param e eventオブジェクト
	 */
	const registerParts: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			const partArray: HTMLInputElement[] = Array.from(
				document.querySelectorAll('[data-js=part]'),
			);
			const partValues = partArray.map((part) => part.value);
			if (partValues.some((value) => value === '')) {
				window.alert('未入力の項目があります');
				return;
			}
			setLocalParts([...partValues]);
			dispatch(updateParts({ parts: [...partValues] }));
		},
		[dispatch],
	);

	/**
	 * partsの編集内容を破棄する関数
	 *
	 * @param e eventオブジェクト
	 */
	const cancelParts: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			setLocalParts([...parts]);
			dispatch(toggleSettingFormIsShown(false));
		},
		[parts],
	);

	return (
		<Part
			isLoading={isLoading}
			localParts={localParts}
			handleChange={handleChange}
			movePart={movePart}
			addPartForm={addPartForm}
			deletePartForm={deletePartForm}
			registerParts={registerParts}
			cancelParts={cancelParts}
		/>
	);
});

Component.displayName = 'Component';
export default Component;

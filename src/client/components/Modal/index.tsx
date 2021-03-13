import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectModalIsShown,
	toggleModalIsShown,
} from '../../redux/modules/boolean';
import Modal from './Modal';
import { onClickButton, onKeyDownModal } from '../../declarations/types';
import { selectAttendance } from '../../redux/modules/attendance';
import { selectEvent } from '../../redux/modules/event';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const event = useSelector(selectEvent);
	const attendance = useSelector(selectAttendance);
	const modalIsShown = useSelector(selectModalIsShown);

	// モーダルを開く前にフォーカスされていた要素を格納する変数
	let focusedEl: HTMLElement;

	// クリックされた練習日のlocation/plan/remarkを変数に代入
	const location = event.locations.find(
		(loc) => event.locations.indexOf(loc) === attendance.index,
	);
	const plan = event.plans.find(
		(pln) => event.plans.indexOf(pln) === attendance.index,
	);
	const remark = event.remarks.find(
		(remrk) => event.remarks.indexOf(remrk) === attendance.index,
	);

	// location/plan/remarkがない、もしくは空文字であれば未入力を変数に代入
	const name1 = location
		? location.name1
			? location.name1
			: '未入力'
		: '未入力';
	const name2 = location
		? location.name2
			? location.name2
			: '未入力'
		: '未入力';
	const url = location ? (location.url ? location.url : '未入力') : '未入力';
	const category = plan
		? plan.category
			? plan.category
			: '未入力'
		: '未入力';
	const schedule = plan
		? plan.schedule
			? plan.schedule
			: '未入力'
		: '未入力';
	const contents = remark
		? remark.contents
			? remark.contents
			: '未入力'
		: '未入力';

	/**
	 * モーダルを閉じる関数
	 * useCallbackでwrapするとfocusedElの値が取得できないので素のまま
	 * @param e eventオブジェクト
	 */
	const closeModal: onClickButton = (e) => {
		e.preventDefault();
		dispatch(toggleModalIsShown(false));
		focusedEl && focusedEl.focus();
	};

	/**
	 * Tabキーを押すとボタンにフォーカスを当てる関数
	 *
	 * @param e eventオブジェクト
	 */
	const pressTab: onKeyDownModal = useCallback((e) => {
		if (e.which === 9) {
			// モーダル内のフォーカスできる要素を配列として格納
			const selectableElms = Array.from(
				document
					.getElementById('modal')!
					.querySelectorAll('button, a[href]'),
			) as HTMLElement[];
			const currentFocus = document.activeElement;
			const currentIndex = selectableElms.findIndex(
				(elm) => elm === currentFocus,
			);
			if (currentIndex < selectableElms.length - 1) {
				selectableElms[currentIndex + 1].focus();
			}
			if (currentIndex === selectableElms.length - 1) {
				selectableElms[0].focus();
			}
			e.preventDefault();
		}
	}, []);

	/**
	 * 文字列からURLを抽出する関数
	 *
	 * @param str
	 */
	const getUrlList = useCallback((str: string) => {
		const pat = /(https?:\/\/[\x21-\x7e]+)/g;
		const list = str.match(pat);
		if (!list) return [];
		return list;
	}, []);

	/**
	 * URLをaタグとして返す関数
	 *
	 * @param path
	 */
	const replaceUrlToLink = useCallback((path: string) => {
		return (
			<a href={path} target="_blank" rel="noreferrer">
				{path}
			</a>
		);
	}, []);

	/**
	 * 文字列にURLが含まれていたらaタグにして返す関数
	 * @param str
	 */
	const replaceToNewStr = useCallback((str: string) => {
		const urlList = getUrlList(str);
		if (urlList.length === 0) return str;
		return replaceUrlToLink(urlList[0]);
	}, []);

	// 初回レンダリング時は発火せず、2回目以降のマウントで発火
	const mounted = useRef(false);
	useEffect(() => {
		if (mounted.current && document.getElementById('modal')) {
			// モーダル表示前のフォーカス要素を変数に格納
			focusedEl = document.activeElement as HTMLElement;

			// モーダル内のフォーカスできる要素を配列として格納
			const selectableElms = Array.from(
				document
					.getElementById('modal')!
					.querySelectorAll('button, a[href]'),
			) as HTMLElement[];

			// モーダル内の一つ目のフォーカスできる要素にフォーカス
			selectableElms[0].focus();
		} else {
			mounted.current = true;
		}
	}, [modalIsShown]);

	return (
		<Modal
			attendance={attendance}
			modalIsShown={modalIsShown}
			name1={name1}
			name2={name2}
			url={url}
			category={category}
			schedule={schedule}
			contents={contents}
			closeModal={closeModal}
			pressTab={pressTab}
			replaceToNewStr={replaceToNewStr}
		/>
	);
});

Component.displayName = 'Component';
export default Component;

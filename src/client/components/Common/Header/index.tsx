import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectEventFormIsShown,
	selectSettingFormIsShown,
	toggleSettingFormIsShown,
} from '../../../redux/modules/boolean';
import { initiateEvent } from '../../../redux/modules/event';
import Header from './Header';
import { onClickButton } from '../../../declarations/types';

const Component: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const eventFormIsShown = useSelector(selectEventFormIsShown);
	const settingFormIsShown = useSelector(selectSettingFormIsShown);
	/**
	 * Event入力フォームを表示する関数
	 *
	 * @param e eventオブジェクト
	 */
	const showEventForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			eventFormIsShown || dispatch(initiateEvent());
		},
		[eventFormIsShown],
	);

	/**
	 * Part入力フォームを表示する関数
	 *
	 * @param e eventオブジェクト
	 */
	const showSettingForm: onClickButton = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(toggleSettingFormIsShown(!settingFormIsShown));
		},
		[settingFormIsShown],
	);

	return (
		<Header
			showEventForm={showEventForm}
			showSettingForm={showSettingForm}
		/>
	);
});

Component.displayName = 'Component';
export default Component;

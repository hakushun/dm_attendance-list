import React from 'react';
import { useSelector } from 'react-redux';
import AttendanceForm from './AttendanceForm';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import Section from '../Common/Section/Section';
import { User } from '../../redux/modules/user';
import { Event } from '../../redux/modules/event';
import {
	onClickButton,
	onClickRadioGroup,
	onKeyDownRadioGroup,
} from '../../declarations/types';
import { selectAttendanceFormIsShown } from '../../redux/modules/boolean';

type Props = {
	parts: string[];
	event: Event;
	user: User;
	isLoading: boolean;
	handleChange: (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) => void;
	showAttendanceForm: onClickButton;
	registerAttendance: onClickButton;
	updateAttendance: onClickButton;
	deleteAttendance: onClickButton;
	cancelAttendance: onClickButton;
	clickRadioGroup: onClickRadioGroup;
	keyDownRadioGroup: onKeyDownRadioGroup;
};

const attendance: React.FC<Props> = React.memo(
	({
		parts,
		event,
		user,
		isLoading,
		handleChange,
		showAttendanceForm,
		registerAttendance,
		updateAttendance,
		deleteAttendance,
		cancelAttendance,
		clickRadioGroup,
		keyDownRadioGroup,
	}) => {
		const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);

		return (
			<>
				{attendanceFormIsShown ? (
					<Section id="attendance" ariahidden="false">
						<AttendanceForm
							parts={parts}
							event={event}
							user={user}
							isLoading={isLoading}
							handleChange={handleChange}
							registerAttendance={registerAttendance}
							updateAttendance={updateAttendance}
							deleteAttendance={deleteAttendance}
							cancelAttendance={cancelAttendance}
							clickRadioGroup={clickRadioGroup}
							keyDownRadioGroup={keyDownRadioGroup}
						/>
					</Section>
				) : (
					<Section id="attendance" ariahidden="false">
						<ButtonWrapper>
							<PrimaryButton
								text="出欠作成"
								method={(e) => {
									showAttendanceForm(e);
								}}
							/>
						</ButtonWrapper>
					</Section>
				)}
			</>
		);
	},
);

attendance.displayName = 'attendance';
export default attendance;

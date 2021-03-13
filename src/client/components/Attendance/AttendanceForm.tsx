import React from 'react';
import styled from 'styled-components';
import AttendanceInput from './AttendanceInput';
import AttendancePartInput from './AttendancePartInput';
import AttendanceNameInput from './AttendanceNameInput';
import CommentInput from './CommentInput';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import DonutSpinner from '../Common/Loading/DonutSpinner';
import { User } from '../../redux/modules/user';
import { Event } from '../../redux/modules/event';
import {
	onClickButton,
	onClickRadioGroup,
	onKeyDownRadioGroup,
} from '../../declarations/types';

const Description = styled.p`
	font-size: 14px;
	line-height: 1.4;
	margin-top: 10px;
`;
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
	registerAttendance: onClickButton;
	updateAttendance: onClickButton;
	deleteAttendance: onClickButton;
	cancelAttendance: onClickButton;
	clickRadioGroup: onClickRadioGroup;
	keyDownRadioGroup: onKeyDownRadioGroup;
};

const attendanceForm: React.FC<Props> = React.memo(
	({
		parts,
		event,
		user,
		isLoading,
		handleChange,
		registerAttendance,
		updateAttendance,
		deleteAttendance,
		cancelAttendance,
		clickRadioGroup,
		keyDownRadioGroup,
	}) => {
		return (
			<form id="attendance_form" role="form">
				<HeadingWrapper>
					{user.id !== 0 ? (
						<Heading text="出欠更新フォーム" />
					) : (
						<Heading text="出欠登録フォーム" />
					)}
					<Description>
						遅刻早退の場合は○を選択の上、
						<br />
						遅刻早退欄にコメントを記入ください
					</Description>
				</HeadingWrapper>
				<AttendancePartInput
					parts={parts}
					user={user}
					handleChange={handleChange}
				/>
				<AttendanceNameInput user={user} handleChange={handleChange} />
				<AttendanceInput
					event={event}
					user={user}
					handleChange={handleChange}
					clickRadioGroup={clickRadioGroup}
					keyDownRadioGroup={keyDownRadioGroup}
				/>
				<CommentInput user={user} handleChange={handleChange} />
				{isLoading ? (
					<DonutSpinner />
				) : (
					<>
						{user.id !== 0 ? (
							<>
								<ButtonWrapper>
									<SecondaryButton
										text="出欠更新"
										method={(e) => {
											updateAttendance(e);
										}}
									/>
								</ButtonWrapper>
								<ButtonWrapper>
									<QuaternaryButton
										text="キャンセル"
										method={(e) => {
											cancelAttendance(e);
										}}
									/>
								</ButtonWrapper>
								<ButtonWrapper>
									<SecondaryButton
										text="出欠削除"
										method={(e) => {
											deleteAttendance(e);
										}}
									/>
								</ButtonWrapper>
							</>
						) : (
							<>
								<ButtonWrapper>
									<SecondaryButton
										text="出欠登録"
										method={(e) => {
											registerAttendance(e);
										}}
									/>
								</ButtonWrapper>
								<ButtonWrapper>
									<QuaternaryButton
										text="キャンセル"
										method={(e) => {
											cancelAttendance(e);
										}}
									/>
								</ButtonWrapper>
							</>
						)}
					</>
				)}
			</form>
		);
	},
);

attendanceForm.displayName = 'attendanceForm';
export default attendanceForm;

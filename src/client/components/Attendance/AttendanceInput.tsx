import React from 'react';
import styled from 'styled-components';
import { generateId, getDayOfWeek } from '../../lib/utilFunctions';
import AttendanceRadio from './AttendanceRadio';
import AttendanceRemarkInput from './AttendanceRemarkInput';
import { User } from '../../redux/modules/user';
import { Event } from '../../redux/modules/event';
import {
	onClickRadioGroup,
	onKeyDownRadioGroup,
} from '../../declarations/types';

const AttendanceInputWrapper = styled.div`
	padding: 10px 0;
`;
const LabelSpan = styled.span`
	display: inline-block;
	font-size: 16px;
	font-weight: bold;
	padding: 5px;
`;
const Legend = styled.legend`
	margin: 0 auto;
`;
type Props = {
	event: Event;
	user: User;
	handleChange: (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) => void;
	clickRadioGroup: onClickRadioGroup;
	keyDownRadioGroup: onKeyDownRadioGroup;
};

const attendanceInput: React.FC<Props> = React.memo(
	({ event, user, handleChange, clickRadioGroup, keyDownRadioGroup }) => {
		return (
			<>
				{event.days.map((day, i) => {
					return (
						<AttendanceInputWrapper key={generateId('attend', i)}>
							<fieldset>
								<Legend id={generateId('attend', i)}>
									<LabelSpan>
										{day}
										{getDayOfWeek(day)}
									</LabelSpan>
									<LabelSpan>{event.times[i]}</LabelSpan>
								</Legend>
								<AttendanceRadio
									user={user}
									index={i}
									id={generateId('attend', i)}
									clickRadioGroup={clickRadioGroup}
									keyDownRadioGroup={keyDownRadioGroup}
								/>
								<AttendanceRemarkInput
									user={user}
									handleChange={handleChange}
									index={i}
								/>
							</fieldset>
						</AttendanceInputWrapper>
					);
				})}
			</>
		);
	},
);

attendanceInput.displayName = 'attendanceInput';
export default attendanceInput;

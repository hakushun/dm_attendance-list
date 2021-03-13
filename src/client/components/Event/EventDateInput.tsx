import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import Required from '../Common/FormIcon/Required';
import { onChange } from '../../declarations/types';

const DateInputWrapper = styled.div`
	padding: 5px 0;
`;
const EventLabel = styled.span`
	display: block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px;
`;
const InputWrapper = styled.div`
	display: block;
	padding: 5px 0;
`;
const DateLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px;
`;
const Input = styled.input`
	background-color: #fff;
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	height: 22px;
	padding: 5px 10px;
	width: 165px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
		box-shadow: 0 0 5px #ff337a;
	}

	@media (max-width: 480px) {
		display: block;
		margin: 0 auto;
	}
`;
const EventLabelWrapper = styled.legend`
	margin: 0 auto;
`;
const DateLabelWrapper = styled.legend`
	/* IE用のスタイル */
	display: inline-block;

	/* IE以外はコチラが上書きされる */
	display: contents;
`;
type Props = {
	days: string[];
	times: string[];
	handleChangeDay: onChange;
	handleChangeTime: onChange;
};

const eventDateInput: React.FC<Props> = React.memo(
	({ days, times, handleChangeDay, handleChangeTime }) => {
		return (
			<DateInputWrapper>
				<fieldset>
					<EventLabelWrapper>
						<EventLabel>
							練習日時
							<Required />
						</EventLabel>
					</EventLabelWrapper>
					<ul>
						{days.map((day, i) => {
							return (
								<li key={generateId('input-date', i)}>
									<InputWrapper>
										<fieldset>
											<DateLabelWrapper>
												<DateLabel
													htmlFor={generateId(
														'date',
														i,
													)}>
													日付: {i + 1}
												</DateLabel>
											</DateLabelWrapper>
											<Input
												required
												aria-required="true"
												type="date"
												data-js="date"
												value={day}
												id={generateId('date', i)}
												onChange={(e) => {
													handleChangeDay(e);
												}}
											/>
										</fieldset>
									</InputWrapper>
									<InputWrapper>
										<fieldset>
											<DateLabelWrapper>
												<DateLabel
													htmlFor={generateId(
														'time',
														i,
													)}>
													時間: {i + 1}
												</DateLabel>
											</DateLabelWrapper>
											<Input
												required
												aria-required="true"
												type="text"
												maxLength={15}
												data-js="time"
												value={times[i]}
												id={generateId('time', i)}
												onChange={(e) => {
													handleChangeTime(e);
												}}
											/>
										</fieldset>
									</InputWrapper>
								</li>
							);
						})}
					</ul>
				</fieldset>
			</DateInputWrapper>
		);
	},
);

eventDateInput.displayName = 'eventDateInput';
export default eventDateInput;

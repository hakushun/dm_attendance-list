import React from 'react';
import { Event } from '../../redux/modules/event';
import styled from 'styled-components';
import Required from '../Common/FormIcon/Required';

const Wrapper = styled.div`
	padding: 10px 0;
`;
const SelectLabel = styled.label`
	display: inline-block;
	font-size: 16px;
	padding: 5px 0;
`;
const Selectbox = styled.select`
	background-color: #fff;
	border: 2px solid #ffedcc;
	border-radius: 3px;
	font-size: 16px;
	height: 30px;
	width: 160px;

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
const Legend = styled.legend`
	margin: 0 auto;
`;

type Props = {
	event: Event;
	selectedDate: string;
	setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

const CovidTableSelectDate: React.FC<Props> = React.memo(
	({ event, selectedDate, setSelectedDate }) => {
		return (
			<Wrapper>
				<fieldset>
					<Legend>
						<SelectLabel htmlFor="covid-table-date">
							確認したい日付
							<Required />
						</SelectLabel>
					</Legend>
					<Selectbox
						id="covid-table-date"
						value={selectedDate}
						autoFocus
						required
						aria-required="true"
						onChange={(e) => setSelectedDate(e.target.value)}>
						<option value="0">選択してください</option>
						{event.days.map((day, i) => {
							return (
								<option key={i} value={day}>
									{day}
								</option>
							);
						})}
					</Selectbox>
				</fieldset>
			</Wrapper>
		);
	},
);

CovidTableSelectDate.displayName = 'CovidTableSelectDate';
export default CovidTableSelectDate;

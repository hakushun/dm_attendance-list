import React from 'react';
import styled from 'styled-components';
import Required from '../Common/FormIcon/Required';
import { User } from '../../redux/modules/user';

const AttendanceInputWrapper = styled.div`
	padding: 10px 0;
`;
const SelectLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px;
`;
const AttendanceSelect = styled.select`
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
	parts: string[];
	user: User;
	handleChange: (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) => void;
};

const attendancePartInput: React.FC<Props> = React.memo(
	({ parts, user, handleChange }) => {
		return (
			<AttendanceInputWrapper>
				<fieldset>
					<Legend>
						<SelectLabel htmlFor="user_part">
							パート
							<Required />
						</SelectLabel>
					</Legend>
					<AttendanceSelect
						id="user_part"
						name="part"
						value={user.part}
						autoFocus={user.id ? false : true}
						required
						aria-required="true"
						onChange={(e) => handleChange(e)}>
						<option value="">選択してください</option>
						{parts.map((part, i) => (
							<option key={`select-part-${i}`}>{part}</option>
						))}
					</AttendanceSelect>
				</fieldset>
			</AttendanceInputWrapper>
		);
	},
);

attendancePartInput.displayName = 'attendancePartInput';
export default attendancePartInput;

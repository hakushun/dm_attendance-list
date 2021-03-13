import React from 'react';
import styled from 'styled-components';
import Required from '../Common/FormIcon/Required';
import { User } from '../../redux/modules/user';

const AttendanceInputWrapper = styled.div`
	padding: 10px 0;
`;
const InputLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px;
`;
const NameInput = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	padding: 5px 10px;
	width: 180px;

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
	user: User;
	handleChange: (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) => void;
};

const attendanceNameInput: React.FC<Props> = React.memo(
	({ user, handleChange }) => {
		return (
			<AttendanceInputWrapper>
				<fieldset>
					<Legend>
						<InputLabel htmlFor="user_name">
							名前
							<Required />
						</InputLabel>
					</Legend>
					<NameInput
						id="user_name"
						type="text"
						maxLength={20}
						name="name"
						value={user.name}
						autoFocus={user.id ? true : false}
						required
						aria-required="true"
						onChange={(e) => handleChange(e)}
					/>
				</fieldset>
			</AttendanceInputWrapper>
		);
	},
);

attendanceNameInput.displayName = 'attendanceNameInput';
export default attendanceNameInput;

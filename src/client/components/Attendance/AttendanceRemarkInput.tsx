import React from 'react';
import styled from 'styled-components';
import Optional from '../Common/FormIcon/Optional';
import { User } from '../../redux/modules/user';

const AttendanceInputWrapper = styled.div`
	padding: 5px 0;
`;
const LabelSpan = styled.span`
	display: inline-block;
	font-size: 14px;
	padding: 5px;
`;
const RemarkInput = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	padding: 5px 10px;
	width: 180px;

	@media (max-width: 480px) {
		display: block;
		margin: 0 auto;
	}
`;
type Props = {
	user: User;
	handleChange: (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>,
	) => void;
	index: number;
};

const attendanceRemarkInput: React.FC<Props> = React.memo(
	({ user, handleChange, index }) => {
		return (
			<AttendanceInputWrapper>
				<label>
					<LabelSpan>
						遅刻早退
						<Optional />
					</LabelSpan>
					<RemarkInput
						type="text"
						maxLength={40}
						name="remark"
						data-js="remark"
						value={user.remarks[index]}
						onChange={(e) => handleChange(e)}
					/>
				</label>
			</AttendanceInputWrapper>
		);
	},
);

attendanceRemarkInput.displayName = 'attendanceRemarkInput';
export default attendanceRemarkInput;

import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { Remark } from '../../redux/modules/event';
import Optional from '../Common/FormIcon/Optional';

const FormInputWrapper = styled.div`
	padding: 5px 0;
	text-align: center;
`;
const LabelTitle = styled.label`
	display: inline-block;
`;
const Textarea = styled.textarea`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: block;
	font-size: 14px;
	margin: 0 auto;
	max-height: 300px;
	max-width: 280px;
	min-height: 80px;
	min-width: 280px;
	resize: vertical;
`;
type Props = {
	index: number;
	localRemarks: Remark[];
	handleChangeRemarks: (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
};

const remarksInput: React.FC<Props> = React.memo(
	({ index, localRemarks, handleChangeRemarks }) => {
		return (
			<FormInputWrapper>
				<LabelTitle htmlFor={generateId('contents', index)}>
					備考
					<Optional />
				</LabelTitle>
				<Textarea
					maxLength={500}
					id={generateId('contents', index)}
					value={
						localRemarks[index] ? localRemarks[index].contents : ''
					}
					onChange={(e) => handleChangeRemarks(e)}
				/>
			</FormInputWrapper>
		);
	},
);

remarksInput.displayName = 'remarksInput';
export default remarksInput;

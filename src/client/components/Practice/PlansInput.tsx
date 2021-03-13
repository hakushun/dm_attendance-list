import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { Plan } from '../../redux/modules/event';
import Optional from '../Common/FormIcon/Optional';
import { onChangeOrTextArea } from '../../declarations/types';

const FormInputWrapper = styled.div`
	padding: 5px 0;
	text-align: center;
`;
const Input = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: block;
	font-size: 14px;
	height: 22px;
	margin: 0 auto;
	width: 280px;
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
	max-height: 250px;
	max-width: 280px;
	min-height: 80px;
	min-width: 280px;
	resize: vertical;
`;
type Props = {
	index: number;
	localPlans: Plan[];
	handleChangePlans: onChangeOrTextArea;
};

const plansInput: React.FC<Props> = React.memo(
	({ index, localPlans, handleChangePlans }) => {
		return (
			<>
				<FormInputWrapper>
					<LabelTitle htmlFor={generateId('category', index)}>
						区分
						<Optional />
					</LabelTitle>
					<Input
						type="text"
						maxLength={20}
						id={generateId('category', index)}
						value={
							localPlans[index] ? localPlans[index].category : ''
						}
						onChange={(e) => handleChangePlans(e)}
					/>
				</FormInputWrapper>
				<FormInputWrapper>
					<LabelTitle htmlFor={generateId('schedule', index)}>
						スケジュール
						<Optional />
					</LabelTitle>
					<Textarea
						maxLength={300}
						id={generateId('schedule', index)}
						value={
							localPlans[index] ? localPlans[index].schedule : ''
						}
						onChange={(e) => handleChangePlans(e)}
					/>
				</FormInputWrapper>
			</>
		);
	},
);

plansInput.displayName = 'plansInput';
export default plansInput;

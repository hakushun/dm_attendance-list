import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { onChange } from '../../declarations/types';

const List = styled.li`
	padding: 5px 0;
`;
const InputLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	min-width: 60px;
	padding: 5px 10px;
`;
const Input = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	min-height: 22px;
	padding: 5px 10px;
	width: 220px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
		box-shadow: 0 0 5px #ff337a;
	}
`;
type Props = {
	handleChange: onChange;
	program: string;
	index: number;
};

const programInput: React.FC<Props> = React.memo(
	({ handleChange, program, index }) => {
		return (
			<List>
				<InputLabel htmlFor={generateId('program', index)}>{`曲目${
					index + 1
				}:`}</InputLabel>
				<Input
					id={generateId('program', index)}
					type="text"
					data-js="program"
					value={program}
					required
					aria-required="true"
					placeholder="曲名を入力ください"
					autoFocus={program === '' ? true : false}
					maxLength={30}
					onChange={(e) => {
						handleChange(e);
					}}
				/>
			</List>
		);
	},
);

programInput.displayName = 'programInput';
export default programInput;

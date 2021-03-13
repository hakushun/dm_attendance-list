import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import Required from '../Common/FormIcon/Required';
import { User } from '../../redux/modules/user';
import {
	onClickRadioGroup,
	onKeyDownRadioGroup,
} from '../../declarations/types';

const Wrapper = styled.div`
	padding: 5px 0;
`;
const Span = styled.span`
	background: #99bdff;
	border: 2px solid #99bdff;
	border-radius: 10px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #fff;
	cursor: pointer;
	display: inline-block;
	font-size: 16px;
	font-weight: bold;
	margin: 0 8px;
	outline: none;
	padding: 5px 10px;
	width: 16px;

	&:hover {
		background-color: #fff;
		color: #99bdff;
	}

	&:focus {
		outline-color: #ff0059;
		outline-offset: 2px;
		outline-style: auto;
	}

	&:active {
		box-shadow: none;
		transform: translateY(3px);
	}

	&[aria-checked='true'] {
		background-color: #0059ff;
		border: 2px solid #0059ff;

		&:hover {
			background-color: #fff;
			color: #99bdff;
		}
	}
`;
type Props = {
	user: User;
	index: number;
	id: string;
	clickRadioGroup: onClickRadioGroup;
	keyDownRadioGroup: onKeyDownRadioGroup;
};

const attendanceRadio: React.FC<Props> = React.memo(
	({ user, index, id, clickRadioGroup, keyDownRadioGroup }) => {
		const attendances = ['○', '△', '×'];
		const attendLabels = ['出席', '未定', '欠席'];

		return (
			<Wrapper
				role="radiogroup"
				aria-required="true"
				aria-labelledby={id}
				aria-activedescendant={`${id}-0`}>
				<Required />
				{attendances.map((attendance, i) => {
					return (
						<>
							<Span
								id={generateId(id, i)}
								role="radio"
								aria-label={attendLabels[i]}
								aria-checked={
									user.attendances[index] === attendance
								}
								tabIndex={
									user.attendances[index] === attendance
										? 0
										: -1
								}
								data-js="attendance"
								onClick={(e) => clickRadioGroup(e)}
								onKeyDown={(e) => {
									keyDownRadioGroup(e);
								}}>
								{attendance}
							</Span>
						</>
					);
				})}
			</Wrapper>
		);
	},
);

attendanceRadio.displayName = 'attendanceRadio';
export default attendanceRadio;

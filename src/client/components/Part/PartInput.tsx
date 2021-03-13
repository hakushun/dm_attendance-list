import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import MiniButton from '../Common/Buttons/MiniButton';
import { onChange, MovePart } from '../../declarations/types';

const ListsWrapper = styled.ul`
	padding: 10px 0;
`;
const ListWrapper = styled.li`
	padding: 3px 0;
`;
const InputWrapper = styled.fieldset`
	display: inline-block;
`;
const InputLabelWrapper = styled.legend`
	display: contents;
`;
const InputLabel = styled.label`
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	min-width: 60px;
	padding: 5px;
`;
const Input = styled.input`
	border: 2px solid #ffedcc;
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	font-weight: bold;
	min-height: 22px;
	padding: 5px 10px;
	width: 160px;

	&:invalid {
		background-color: #ffccde;
		border-color: #ff0059;
		box-shadow: 0 0 5px #ff337a;
	}

	@media (max-width: 480px) {
		padding: 5px;
		width: 120px;
	}
`;
type Props = {
	localParts: string[];
	handleChange: onChange;
	movePart: MovePart;
};

const partInput: React.FC<Props> = React.memo(
	({ localParts, handleChange, movePart }) => {
		return (
			<ListsWrapper>
				{localParts.map((part, i) => {
					return (
						<ListWrapper key={generateId('part', i)}>
							<InputWrapper>
								<InputLabelWrapper>
									<InputLabel htmlFor={generateId('part', i)}>
										パート{i + 1}
									</InputLabel>
								</InputLabelWrapper>
								<Input
									required
									aria-required="true"
									placeholder="パート名を入力ください"
									autoFocus={part === '' ? true : false}
									type="text"
									maxLength={15}
									value={part}
									data-js="part"
									id={generateId('part', i)}
									onChange={(e) => handleChange(e)}
								/>
							</InputWrapper>
							<MiniButton
								datajs={generateId('button', i)}
								method={(e) => movePart(e, -1)}
								text="↑"
								arialabel="上に並び替える"
							/>
							<MiniButton
								datajs={generateId('button', i)}
								method={(e) => movePart(e, 1)}
								text="↓"
								arialabel="下に並び替える"
							/>
						</ListWrapper>
					);
				})}
			</ListsWrapper>
		);
	},
);

partInput.displayName = 'partInput';
export default partInput;

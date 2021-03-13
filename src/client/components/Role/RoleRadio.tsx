import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { Event } from '../../redux/modules/event';

const ListWrapper = styled.ul`
	display: flex;
	flex-direction: column;
	margin: 5px auto 0;
	width: 300px;
`;
const ListItem = styled.li`
	align-items: center;
	display: flex;
	padding: 5px 0;
`;
const Radio = styled.input`
	cursor: pointer;
	margin: 0;
`;
const InputLabel = styled.label`
	cursor: pointer;
	margin-left: 5px;
`;
type Props = {
	event: Event;
	setCheckedProgram: (e: HTMLInputElement) => void;
};

const roleRadio: React.FC<Props> = React.memo(
	({ event, setCheckedProgram }) => {
		return (
			<ListWrapper role="radiogroup" aria-required="true">
				{event.programs &&
					event.programs.map((program, index) => {
						return (
							<ListItem key={generateId('progradio', index)}>
								<Radio
									type="radio"
									id={generateId('progradio', index)}
									name="progradio"
									data-js="progradio"
									value={program}
									onClick={(e) =>
										setCheckedProgram(
											e.target as HTMLInputElement,
										)
									}
								/>
								<InputLabel
									htmlFor={generateId('progradio', index)}>
									{program}
								</InputLabel>
							</ListItem>
						);
					})}
			</ListWrapper>
		);
	},
);

roleRadio.displayName = 'roleRadio';
export default roleRadio;

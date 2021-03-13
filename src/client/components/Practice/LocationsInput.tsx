import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import { Location } from '../../redux/modules/event';
import Optional from '../Common/FormIcon/Optional';
import { onChange } from '../../declarations/types';

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

type Props = {
	index: number;
	localLocations: Location[];
	handleChangeLocations: onChange;
};

const locationsInput: React.FC<Props> = React.memo(
	({ index, localLocations, handleChangeLocations }) => {
		return (
			<>
				<FormInputWrapper>
					<LabelTitle htmlFor={generateId('name1', index)}>
						施設名1
						<Optional />
					</LabelTitle>
					<Input
						autoFocus={index === 0 ? true : false}
						type="text"
						maxLength={30}
						id={generateId('name1', index)}
						value={
							localLocations[index]
								? localLocations[index].name1
								: ''
						}
						onChange={(e) => handleChangeLocations(e)}
					/>
				</FormInputWrapper>
				<FormInputWrapper>
					<LabelTitle htmlFor={generateId('name2', index)}>
						施設名2
						<Optional />
					</LabelTitle>
					<Input
						type="text"
						maxLength={30}
						id={generateId('name2', index)}
						value={
							localLocations[index]
								? localLocations[index].name2
								: ''
						}
						onChange={(e) => handleChangeLocations(e)}
					/>
				</FormInputWrapper>
				<FormInputWrapper>
					<LabelTitle htmlFor={generateId('url', index)}>
						URL
						<Optional />
					</LabelTitle>
					<Input
						type="url"
						id={generateId('url', index)}
						value={
							localLocations[index]
								? localLocations[index].url
								: ''
						}
						onChange={(e) => handleChangeLocations(e)}
					/>
				</FormInputWrapper>
			</>
		);
	},
);

locationsInput.displayName = 'locationsInput';
export default locationsInput;

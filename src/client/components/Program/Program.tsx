import React from 'react';
import styled from 'styled-components';
import ProgramForm from './ProgramForm';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import { Event } from '../../redux/modules/event';

const Description = styled.p`
	font-size: 16px;
	line-height: 1.4;
	padding: 10px 0;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
const Wrapper = styled.div`
	border: 1px solid #998e7a;
	box-shadow: 0 10px 5px -5px #998e7a;
	margin: 0 auto;
	padding: 20px 0;
	width: 500px;

	@media (max-width: 480px) {
		width: calc(100vw - 35px);
	}
`;
type Props = {
	event: Event;
	programs: string[];
	isLoading: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addProgramInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	deleteProgramInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	registerPrograms: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	cancelEdit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const program: React.FC<Props> = React.memo(
	({
		event,
		programs,
		isLoading,
		handleChange,
		addProgramInput,
		deleteProgramInput,
		registerPrograms,
		cancelEdit,
	}) => {
		return (
			<Wrapper id="program" role="tabpanel" className="isHidden">
				<HeadingWrapper>
					<Heading text="プログラム 登録フォーム" />
				</HeadingWrapper>
				{event.id === 0 ? (
					<Description>
						プログラムを登録したいイベントを
						<br />
						イベント一覧より選択してください
					</Description>
				) : (
					<ProgramForm
						event={event}
						programs={programs}
						isLoading={isLoading}
						handleChange={handleChange}
						addProgramInput={addProgramInput}
						deleteProgramInput={deleteProgramInput}
						registerPrograms={registerPrograms}
						cancelEdit={cancelEdit}
					/>
				)}
			</Wrapper>
		);
	},
);

program.displayName = 'program';
export default program;

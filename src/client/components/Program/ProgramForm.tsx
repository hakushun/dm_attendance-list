import React from 'react';
import styled from 'styled-components';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import TernaryButton from '../Common/Buttons/TernaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import DonutSpinner from '../Common/Loading/DonutSpinner';
import { generateId } from '../../lib/utilFunctions';
import ProgramInput from './ProgramInput';
import { Event } from '../../redux/modules/event';

const ListsWrapper = styled.ul`
	padding: 10px 0;
`;
const FormSubTitle = styled.span`
	display: inline-block;
	font-size: 18px;
	font-weight: bold;
	padding: 10px 0 0;
`;
const Legend = styled.legend`
	margin: 0 auto;
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

const programForm: React.FC<Props> = React.memo(
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
			<form id="program_form" role="form">
				<fieldset>
					<Legend>
						<FormSubTitle>
							{event.title}のプログラム登録
						</FormSubTitle>
					</Legend>
					<ListsWrapper>
						{programs ? (
							<>
								{programs.map((program, i) => {
									return (
										<ProgramInput
											key={generateId('program', i)}
											program={program}
											index={i}
											handleChange={handleChange}
										/>
									);
								})}
							</>
						) : null}
					</ListsWrapper>
				</fieldset>
				<ButtonWrapper>
					<TernaryButton
						text="追加"
						method={(e) => {
							addProgramInput(e);
						}}
						arialabel="入力フォームの追加"
					/>
					<TernaryButton
						text="削除"
						method={(e) => {
							deleteProgramInput(e);
						}}
						arialabel="入力フォームの削除"
					/>
				</ButtonWrapper>
				{isLoading ? (
					<DonutSpinner />
				) : (
					<>
						<ButtonWrapper>
							<SecondaryButton
								text="プログラムの更新"
								method={(e) => {
									registerPrograms(e);
								}}
							/>
						</ButtonWrapper>
						<ButtonWrapper>
							<QuaternaryButton
								text="キャンセル"
								method={(e) => {
									cancelEdit(e);
								}}
							/>
						</ButtonWrapper>
					</>
				)}
			</form>
		);
	},
);

programForm.displayName = 'programForm';
export default programForm;

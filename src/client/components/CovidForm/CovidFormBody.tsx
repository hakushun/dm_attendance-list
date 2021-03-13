import React from 'react';
import styled from 'styled-components';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import { Event } from '../../redux/modules/event';
import { User } from '../../redux/modules/user';
import CovidSelectPart from './CovidSelectPart';
import CovidSelectUser from './CovidSelectUser';
import CovidSelectDate from './CovidSelectDate';
import CovidRadio from './CovidRadio';
import { onClickButton } from '../../declarations/types';
import DonutSpinner from '../Common/Loading/DonutSpinner';

const Description = styled.p`
	font-size: 14px;
	line-height: 1.4;
	margin-top: 10px;
`;

type Props = {
	covidsIsLoading: boolean;
	event: Event;
	userParts: string[];
	selectedPart: string;
	setSelectedPart: React.Dispatch<React.SetStateAction<string>>;
	matchedUsers: User[];
	selectedUser: string;
	setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
	selectedDate: string;
	setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
	answers: { [s: string]: string };
	setAnswers: React.Dispatch<
		React.SetStateAction<{
			[s: string]: string;
		}>
	>;
	showCovidForm: onClickButton;
	registerAnswers: onClickButton;
	cancelAnswers: onClickButton;
};
const CovidFormBody: React.FC<Props> = React.memo(
	({
		covidsIsLoading,
		event,
		userParts,
		selectedPart,
		setSelectedPart,
		matchedUsers,
		selectedUser,
		setSelectedUser,
		selectedDate,
		setSelectedDate,
		answers,
		setAnswers,
		registerAnswers,
		cancelAnswers,
	}) => {
		return (
			<form id="covid_form" role="form">
				<HeadingWrapper>
					<Heading text="コロナアンケート" />
				</HeadingWrapper>
				<Description>
					出欠作成後に回答してください
					<br />
					一つでも当てはまる場合はお休みください
				</Description>
				<CovidSelectPart
					userParts={userParts}
					selectedPart={selectedPart}
					setSelectedPart={setSelectedPart}
				/>
				<CovidSelectUser
					matchedUsers={matchedUsers}
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
				/>
				<CovidSelectDate
					event={event}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
				<CovidRadio answers={answers} setAnswers={setAnswers} />
				{covidsIsLoading ? (
					<DonutSpinner />
				) : (
					<>
						<ButtonWrapper>
							<SecondaryButton
								text="回答を登録"
								method={(e) => {
									registerAnswers(e);
								}}
							/>
						</ButtonWrapper>
						<ButtonWrapper>
							<QuaternaryButton
								text="キャンセル"
								method={(e) => {
									cancelAnswers(e);
								}}
							/>
						</ButtonWrapper>
					</>
				)}
			</form>
		);
	},
);

CovidFormBody.displayName = 'CovidFormBody';
export default CovidFormBody;

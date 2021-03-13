import React from 'react';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import Section from '../Common/Section/Section';
import { Event } from '../../redux/modules/event';
import { User } from '../../redux/modules/user';
import { useSelector } from 'react-redux';
import CovidFormBody from './CovidFormBody';
import { onClickButton } from '../../declarations/types';
import { selectCovidFormIsShown } from '../../redux/modules/boolean';

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
const CovidForm: React.FC<Props> = React.memo(
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
		showCovidForm,
		registerAnswers,
		cancelAnswers,
	}) => {
		const covidFormIsShown = useSelector(selectCovidFormIsShown);

		return (
			<Section id="covid_inquiry" ariahidden="false">
				{covidFormIsShown ? (
					<CovidFormBody
						covidsIsLoading={covidsIsLoading}
						event={event}
						userParts={userParts}
						selectedPart={selectedPart}
						setSelectedPart={setSelectedPart}
						matchedUsers={matchedUsers}
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						answers={answers}
						setAnswers={setAnswers}
						showCovidForm={showCovidForm}
						registerAnswers={registerAnswers}
						cancelAnswers={cancelAnswers}
					/>
				) : (
					<ButtonWrapper>
						<PrimaryButton
							text="コロナアンケート"
							method={(e) => showCovidForm(e)}
						/>
					</ButtonWrapper>
				)}
			</Section>
		);
	},
);

CovidForm.displayName = 'CovidForm';
export default CovidForm;

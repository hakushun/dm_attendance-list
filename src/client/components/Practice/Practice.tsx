import React from 'react';
import styled from 'styled-components';
import { Event, Location, Plan, Remark } from '../../redux/modules/event';
import PracticeForm from './PracticeForm';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import {
	onClickButton,
	onChange,
	onChangeTextArea,
	onChangeOrTextArea,
} from '../../declarations/types';

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
const Description = styled.p`
	font-size: 16px;
	line-height: 1.4;
	padding: 10px 0;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
type Props = {
	event: Event;
	isLoading: boolean;
	localLocations: Location[];
	localPlans: Plan[];
	localRemarks: Remark[];
	toggleAccordion: onClickButton;
	handleChangeLocations: onChange;
	handleChangePlans: onChangeOrTextArea;
	handleChangeRemarks: onChangeTextArea;
	registerPractice: onClickButton;
	cancelEdit: onClickButton;
};

const practice: React.FC<Props> = React.memo(
	({
		event,
		isLoading,
		localLocations,
		localPlans,
		localRemarks,
		toggleAccordion,
		handleChangeLocations,
		handleChangePlans,
		handleChangeRemarks,
		registerPractice,
		cancelEdit,
	}) => {
		return (
			<Wrapper id="practice" role="tabpanel" aria-hidden="true">
				<HeadingWrapper>
					<Heading text="練習予定 登録フォーム" />
				</HeadingWrapper>
				{event.id === 0 ? (
					<Description>
						練習予定を登録したいイベントを
						<br />
						イベント一覧より選択してください
					</Description>
				) : (
					<PracticeForm
						event={event}
						isLoading={isLoading}
						localLocations={localLocations}
						localPlans={localPlans}
						localRemarks={localRemarks}
						handleChangeLocations={handleChangeLocations}
						handleChangePlans={handleChangePlans}
						handleChangeRemarks={handleChangeRemarks}
						toggleAccordion={toggleAccordion}
						cancelEdit={cancelEdit}
						registerPractice={registerPractice}
					/>
				)}
			</Wrapper>
		);
	},
);

practice.displayName = 'practice';
export default practice;

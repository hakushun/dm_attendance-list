import React from 'react';
import styled from 'styled-components';
import { Event, Location, Plan, Remark } from '../../redux/modules/event';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import DonutSpinner from '../Common/Loading/DonutSpinner';
import LocationsInput from './LocationsInput';
import PlansInput from './PlansInput';
import RemarksInput from './RemarksInput';
import {
	onClickButton,
	onChange,
	onChangeTextArea,
	onChangeOrTextArea,
} from '../../declarations/types';

const FormWrapper = styled.div`
	padding: 10px 0;
`;
const FormInner = styled.div`
	border: 1.5px solid #998e7a;
	margin: 0 auto;
	width: 300px;

	&:not(:first-of-type) {
		border-top: none;
	}
`;
const FormSubTitleWrapper = styled.legend`
	margin: 0 auto;
`;
const FormSubTitle = styled.span`
	display: inline-block;
	font-size: 18px;
	font-weight: bold;
	padding-bottom: 10px;
`;
const InputTitle = styled.button`
	background: none;
	border: none;
	font-size: 18px;
	font-weight: bold;
	padding: 10px 0;
	position: relative;
	-webkit-tap-highlight-color: transparent;
	width: 100%;
`;
const Legend = styled.legend`
	width: 100%;
`;
const InputWrapper = styled.div`
	padding: 10px 0;
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
	cancelEdit: onClickButton;
	registerPractice: onClickButton;
};

const practiceForm: React.FC<Props> = React.memo(
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
		cancelEdit,
		registerPractice,
	}) => {
		return (
			<form id="practice_form" role="form">
				<FormWrapper>
					<fieldset>
						<FormSubTitleWrapper>
							<FormSubTitle>
								{event.title}の練習予定登録
							</FormSubTitle>
						</FormSubTitleWrapper>
						{event.days.map((day, i) => {
							return (
								<FormInner key={`practice-day${i}`}>
									<fieldset>
										<Legend>
											<InputTitle
												type="button"
												className="Arrow"
												data-js={`day${i}`}
												aria-expanded="false"
												aria-controls={`practice-day${i}`}
												onClick={toggleAccordion}>
												{day}の予定
											</InputTitle>
										</Legend>
										<InputWrapper
											className="Accordion"
											id={`practice-day${i}`}
											aria-hidden="true">
											<LocationsInput
												index={i}
												localLocations={localLocations}
												handleChangeLocations={
													handleChangeLocations
												}
											/>
											<PlansInput
												index={i}
												localPlans={localPlans}
												handleChangePlans={
													handleChangePlans
												}
											/>
											<RemarksInput
												index={i}
												localRemarks={localRemarks}
												handleChangeRemarks={
													handleChangeRemarks
												}
											/>
										</InputWrapper>
									</fieldset>
								</FormInner>
							);
						})}
					</fieldset>
				</FormWrapper>
				{isLoading ? (
					<DonutSpinner />
				) : (
					<>
						<ButtonWrapper>
							<SecondaryButton
								text="練習予定の更新"
								method={(e) => registerPractice(e)}
							/>
						</ButtonWrapper>
						<ButtonWrapper>
							<QuaternaryButton
								text="キャンセル"
								method={(e) => cancelEdit(e)}
							/>
						</ButtonWrapper>
					</>
				)}
			</form>
		);
	},
);

practiceForm.displayName = 'practiceForm';
export default practiceForm;

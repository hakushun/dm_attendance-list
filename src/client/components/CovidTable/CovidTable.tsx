import React from 'react';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import UtilButton from '../Common/Buttons/UtilButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import Section from '../Common/Section/Section';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading3';
import { Event } from '../../redux/modules/event';
import { Response as typeResponse } from '../../redux/modules/covids';
import { User as typeUser } from '../../redux/modules/user';
import CovidAnsweredList from './CovidAnsweredList';
import CovidUnansweredList from './CovidUnansweredList';
import CovidTableSelectDate from './CovidTableSelectDate';
import CovidTableCategoryRadio from './CovidTableCategoryRadio';
import { exportToExcel } from '../../lib/utilFunctions';
import { onClickButton } from '../../declarations/types';

type Props = {
	covidTableIsShown: boolean;
	event: Event;
	users: typeUser[];
	selectedDate: string;
	setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
	selectedCategory: string;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
	targetData: typeResponse[];
	unansweredUsers: typeUser[];
	showCovidTable: onClickButton;
	closeCovidTable: onClickButton;
};

const CovidTable: React.FC<Props> = React.memo(
	({
		covidTableIsShown,
		event,
		users,
		selectedDate,
		setSelectedDate,
		selectedCategory,
		setSelectedCategory,
		targetData,
		unansweredUsers,
		showCovidTable,
		closeCovidTable,
	}) => {
		return (
			<Section id="covid_table" ariahidden="false">
				{covidTableIsShown ? (
					<>
						<HeadingWrapper>
							<Heading text="アンケート回答結果" />
						</HeadingWrapper>
						<CovidTableSelectDate
							event={event}
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
						<CovidTableCategoryRadio
							setSelectedCategory={setSelectedCategory}
						/>
						{selectedCategory === 'answered' ? (
							<>
								<CovidAnsweredList
									users={users}
									targetData={targetData}
								/>
								<ButtonWrapper>
									<UtilButton
										text="export to Excel"
										method={() => {
											exportToExcel(
												'#covid_table_xlsx',
												'アンケート結果',
											);
										}}
									/>
								</ButtonWrapper>
							</>
						) : (
							<CovidUnansweredList
								unansweredUsers={unansweredUsers}
							/>
						)}
						<ButtonWrapper>
							<QuaternaryButton
								text="閉じる"
								method={(e) => {
									closeCovidTable(e);
								}}
							/>
						</ButtonWrapper>
					</>
				) : (
					<ButtonWrapper>
						<PrimaryButton
							text="アンケート回答結果"
							method={(e) => showCovidTable(e)}
						/>
					</ButtonWrapper>
				)}
			</Section>
		);
	},
);

CovidTable.displayName = 'CovidTable';
export default CovidTable;

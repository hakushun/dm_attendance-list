import React from 'react';
import EventInput from './EventInput';
import EventDateInput from './EventDateInput';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import TernaryButton from '../Common/Buttons/TernaryButton';
import QuaternaryButton from '../Common/Buttons/QuaternaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading2';
import DonutSpinner from '../Common/Loading/DonutSpinner';
import { Event } from '../../redux/modules/event';
import { onClickButton, onChange } from '../../declarations/types';

type Props = {
	event: Event;
	title: string;
	detail: string;
	days: string[];
	times: string[];
	isLoading: boolean;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setDetail: React.Dispatch<React.SetStateAction<string>>;
	handleChangeDay: onChange;
	handleChangeTime: onChange;
	addEventForm: onClickButton;
	deleteEventForm: onClickButton;
	registerEvent: onClickButton;
	cancelEvent: onClickButton;
	deleteEvent: onClickButton;
};

const eventForm: React.FC<Props> = React.memo(
	({
		event,
		title,
		detail,
		days,
		times,
		isLoading,
		setTitle,
		setDetail,
		handleChangeDay,
		handleChangeTime,
		addEventForm,
		deleteEventForm,
		registerEvent,
		cancelEvent,
		deleteEvent,
	}) => {
		return (
			<form id="event_form" role="form">
				<HeadingWrapper>
					{event.id === 0 ? (
						<Heading text="イベント作成フォーム" />
					) : (
						<Heading text="イベント更新フォーム" />
					)}
				</HeadingWrapper>
				<EventInput
					title={title}
					detail={detail}
					setTitle={setTitle}
					setDetail={setDetail}
				/>
				<EventDateInput
					days={days}
					times={times}
					handleChangeDay={handleChangeDay}
					handleChangeTime={handleChangeTime}
				/>
				<ButtonWrapper>
					<TernaryButton
						text="追加"
						method={(e) => {
							addEventForm(e);
						}}
						arialabel="日時の追加"
					/>
					<TernaryButton
						text="削除"
						method={(e) => {
							deleteEventForm(e);
						}}
						arialabel="日時の削除"
					/>
				</ButtonWrapper>
				{isLoading ? (
					<DonutSpinner />
				) : (
					<>
						<ButtonWrapper>
							<SecondaryButton
								text={
									event.id === 0
										? 'イベントの登録'
										: `${event.title}の更新`
								}
								method={(e) => {
									registerEvent(e);
								}}
							/>
						</ButtonWrapper>
						<ButtonWrapper>
							<QuaternaryButton
								text="キャンセル"
								method={(e) => {
									cancelEvent(e);
								}}
							/>
						</ButtonWrapper>
						{event.id > 0 && (
							<ButtonWrapper>
								<SecondaryButton
									text={`${event.title}の削除`}
									method={(e) => {
										deleteEvent(e);
									}}
								/>
							</ButtonWrapper>
						)}
					</>
				)}
			</form>
		);
	},
);

eventForm.displayName = 'eventForm';
export default eventForm;

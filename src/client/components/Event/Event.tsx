import React from 'react';
import { useSelector } from 'react-redux';
import EventForm from './EventForm';
import PrimaryButton from '../Common/Buttons/PrimaryButton';
import ButtonWrapper from '../Common/Buttons/ButtonWrapper';
import Section from '../Common/Section/Section';
import { Event } from '../../redux/modules/event';
import { onClickButton, onChange } from '../../declarations/types';
import { selectEventFormIsShown } from '../../redux/modules/boolean';
import { selectCurrentUser } from '../../redux/modules/currentUser';
import { isAdmin } from '../../lib/utilFunctions';

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
	editEventForm: onClickButton;
	addEventForm: onClickButton;
	deleteEventForm: onClickButton;
	registerEvent: onClickButton;
	cancelEvent: onClickButton;
	deleteEvent: onClickButton;
};

const Event: React.FC<Props> = React.memo(
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
		editEventForm,
		addEventForm,
		deleteEventForm,
		registerEvent,
		cancelEvent,
		deleteEvent,
	}) => {
		const eventFormIsShown = useSelector(selectEventFormIsShown);
		const currentUser = useSelector(selectCurrentUser);

		return (
			<>
				{eventFormIsShown ? (
					<Section id="event" ariahidden="false">
						<EventForm
							event={event}
							title={title}
							detail={detail}
							days={days}
							times={times}
							isLoading={isLoading}
							setTitle={setTitle}
							setDetail={setDetail}
							handleChangeDay={handleChangeDay}
							handleChangeTime={handleChangeTime}
							addEventForm={addEventForm}
							deleteEventForm={deleteEventForm}
							registerEvent={registerEvent}
							cancelEvent={cancelEvent}
							deleteEvent={deleteEvent}
						/>
					</Section>
				) : event.id > 0 ? (
					isAdmin(currentUser) && (
						<Section id="event" ariahidden="false">
							<ButtonWrapper>
								<PrimaryButton
									text={`${event.title}の編集`}
									method={(e) => {
										editEventForm(e);
									}}
								/>
							</ButtonWrapper>
						</Section>
					)
				) : null}
			</>
		);
	},
);

Event.displayName = 'Event';
export default Event;

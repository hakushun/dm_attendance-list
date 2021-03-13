import React from 'react';
import styled from 'styled-components';
import { generateId } from '../../lib/utilFunctions';
import SectionWithBorder from '../Common/Section/SectionWithBorder';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading2';
import Bouncing from '../Common/Loading/Bouncing';
import { Event } from '../../redux/modules/event';
import { onClickAncor } from '../../declarations/types';

const ListBody = styled.ul`
	padding: 5px 0;
`;
const ListItem = styled.li`
	padding: 5px 0;
`;
const ListLink = styled.a`
	color: #0059ff;
	cursor: pointer;
	font-size: 16px;
	line-height: 1.2;
	text-decoration: none;

	&:hover {
		font-size: 18px;
		font-weight: bold;
	}

	&:focus {
		font-size: 18px;
		font-weight: bold;
	}
`;
const Description = styled.div`
	padding: 10px 0;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;
const Wrapper = styled.div`
	padding: 20px 0;
	text-align: center;
`;
type Props = {
	events: Event[];
	eventsState: string;
	selectEvent: onClickAncor;
};

const eventList: React.FC<Props> = React.memo(
	({ events, eventsState, selectEvent }) => {
		return eventsState === 'complete' ? (
			<SectionWithBorder id="event_list" ariahidden="false">
				{events.length > 0 ? (
					<>
						<HeadingWrapper>
							<Heading text="イベント一覧" />
						</HeadingWrapper>
						<Description>
							出欠を登録したいイベントを選択してください
						</Description>
						<ListBody>
							{events.map((event) => {
								return (
									<ListItem
										key={generateId('event', event.id)}>
										<ListLink
											href="#"
											id={generateId('event', event.id)}
											onClick={(e) => selectEvent(e)}>
											{event.title}
										</ListLink>
									</ListItem>
								);
							})}
						</ListBody>
					</>
				) : (
					<Description>イベントが登録されていません</Description>
				)}
			</SectionWithBorder>
		) : (
			<Wrapper>
				<Bouncing />
			</Wrapper>
		);
	},
);

eventList.displayName = 'eventList';
export default eventList;

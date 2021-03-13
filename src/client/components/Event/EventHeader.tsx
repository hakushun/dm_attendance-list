import React from 'react';
import styled from 'styled-components';
import Section from '../Common/Section/Section';
import HeadingWrapper from '../Common/Heading/HeadingWrapper';
import Heading from '../Common/Heading/Heading2';
import { Event } from '../../redux/modules/event';

const DetailWrapper = styled.div`
	max-height: 250px;
	max-width: calc(100vw - 35px);
	overflow-y: auto;
	padding: 10px 0;
`;
const Detail = styled.p`
	display: inline-block;
	font-size: 16px;
	line-height: 1.5;
	white-space: pre-line;
`;
type Props = {
	event: Event;
};
const eventHeader: React.FC<Props> = React.memo(({ event }) => {
	return (
		<Section id="event_header" ariahidden="false">
			<HeadingWrapper>
				<Heading text={event.title} />
			</HeadingWrapper>
			<DetailWrapper>
				<Detail>{event.detail}</Detail>
			</DetailWrapper>
		</Section>
	);
});

eventHeader.displayName = 'eventHeader';
export default eventHeader;

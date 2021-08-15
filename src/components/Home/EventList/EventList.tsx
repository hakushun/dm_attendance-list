import Link from 'next/link';
import React from 'react';
import { Event } from '../../../redux/modules/app/event';
import { Heading } from '../../uiParts/Heading';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';

type Props = {
  events: Event[];
};
export const EventList: React.VFC<Props> = React.memo(({ events }) => {
  return (
    <Sectioning id="event_list">
      <Heading level={2} label="イベント一覧" />
      <ul className={styles.list}>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/event/${event.id}`}>
              <a className={styles.link}>{event.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Sectioning>
  );
});

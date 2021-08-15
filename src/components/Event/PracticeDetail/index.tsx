import React, { useMemo } from 'react';
import { useModal } from '../../../hooks/useModal';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { getStringDate } from '../../../libs/dayjs/getStringDate';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Event } from '../../../redux/modules/app/event';
import { PracticeItem } from '../../../redux/modules/domain/practice';
import { PracticeDetail as Presentational } from './PracticeDetail';

type Props = {
  event: Event;
  practice: PracticeItem;
  dateId: string;
  breakdownAttendances: {
    presence: Attendance[];
    undecided: Attendance[];
    absence: Attendance[];
  };
};
export const PracticeDetail: React.VFC<Props> = React.memo(
  ({ event, practice, dateId, breakdownAttendances }) => {
    const { modalRef, practiceModalIsShown, handleTogglePracticeModal, handleKeydown } = useModal();

    const titleDate = useMemo(
      () => getStringDate(event.dates.find((date) => date.id === dateId)?.day),
      [dateId, event.dates],
    );
    const titleDayOfTheWeek = useMemo(
      () => getDayOfTheWeek(event.dates.find((date) => date.id === dateId)?.day),
      [dateId, event.dates],
    );
    const url = useMemo(
      () => practice.locations.find((loc) => loc.dateId === dateId)?.url,
      [dateId, practice.locations],
    );
    const content = useMemo(
      () => practice.remarks.find((rmrk) => rmrk.dateId === dateId)?.content,
      [dateId, practice.remarks],
    );

    if (!practiceModalIsShown) return null;

    return (
      <Presentational
        practice={practice}
        dateId={dateId}
        breakdownAttendances={breakdownAttendances}
        modalRef={modalRef}
        handleTogglePracticeModal={handleTogglePracticeModal}
        handleKeydown={handleKeydown}
        titleDate={titleDate}
        titleDayOfTheWeek={titleDayOfTheWeek}
        url={url}
        content={content}
      />
    );
  },
);

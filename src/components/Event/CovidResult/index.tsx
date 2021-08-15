import React from 'react';
import { useModal } from '../../../hooks/useModal';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Covid } from '../../../redux/modules/app/covid';
import { CovidResult as Presentational } from './CovidResult';

type Props = {
  isLoading: boolean;
  answerRuselt: (Covid & { name: string | undefined; part: string | undefined })[];
  unasweredUsers: Attendance[];
};
export const CovidResult: React.VFC<Props> = React.memo(
  ({ isLoading, answerRuselt, unasweredUsers }) => {
    const { modalRef, covidResultIsShown, handleToggleCovidResult, handleKeydown } = useModal();

    if (!covidResultIsShown) return null;

    return (
      <Presentational
        isLoading={isLoading}
        answerRuselt={answerRuselt}
        unasweredUsers={unasweredUsers}
        modalRef={modalRef}
        handleToggleCovidResult={handleToggleCovidResult}
        handleKeydown={handleKeydown}
      />
    );
  },
);

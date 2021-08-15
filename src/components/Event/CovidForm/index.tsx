import React from 'react';
import { useCovid } from '../../../hooks/useCovid';
import { useShow } from '../../../hooks/useShow';
import { Event } from '../../../redux/modules/app/event';
import { CovidForm as Presentational } from './CovidForm';

type Props = {
  event: Event;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const CovidForm: React.VFC<Props> = React.memo(({ event, handleCreate }) => {
  const { covid, handleChangeCovidDate, handleChangeCovidAnswers } = useCovid();
  const { covidFormIsShown, handleToggleCovidForm } = useShow();

  return (
    <Presentational
      event={event}
      handleCreate={handleCreate}
      covid={covid}
      handleChangeCovidDate={handleChangeCovidDate}
      handleChangeCovidAnswers={handleChangeCovidAnswers}
      covidFormIsShown={covidFormIsShown}
      handleToggleCovidForm={handleToggleCovidForm}
    />
  );
});

import React from 'react';
import { useProgram } from '../../../../hooks/useProgram';
import { Event } from '../../../../redux/modules/app/event';
import { Loading } from '../../../uiParts/Loading';
import { Program as Presentational } from './Program';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Program: React.VFC<Props> = React.memo(
  ({ event, handleToggleSetting, isLoading, handleUpdate }) => {
    const { program, handleChange, handleAddProgramForm, handleDeleteProgramForm } = useProgram();

    if (isLoading) return <Loading />;

    return (
      <Presentational
        event={event}
        handleToggleSetting={handleToggleSetting}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        program={program}
        handleChange={handleChange}
        handleAddProgramForm={handleAddProgramForm}
        handleDeleteProgramForm={handleDeleteProgramForm}
      />
    );
  },
);

import React from 'react';
import { useEvent } from '../../hooks/useEvent';
import { useShow } from '../../hooks/useShow';
import { EventForm as Presentational } from './EventForm';

type Props = {
  isLoading: boolean;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const EventForm: React.VFC<Props> = React.memo(
  ({ isLoading, handleCreate, handleUpdate, handleRemove }) => {
    const { eventFormIsShown, handleToggleEventForm } = useShow();
    const {
      event,
      handleChangeText,
      handleCangeDay,
      handleCangeTime,
      handleAddDateForm,
      handleDeleteDateForm,
    } = useEvent();

    return (
      <Presentational
        eventFormIsShown={eventFormIsShown}
        handleToggleEventForm={handleToggleEventForm}
        event={event}
        handleChangeText={handleChangeText}
        handleCangeDay={handleCangeDay}
        handleCangeTime={handleCangeTime}
        handleAddDateForm={handleAddDateForm}
        handleDeleteDateForm={handleDeleteDateForm}
        isLoading={isLoading}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
    );
  },
);

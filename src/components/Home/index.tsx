import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Loading } from '../uiParts/Loading';
import { EventForm } from '../EventForm';
import { EventList } from './EventList';
import { useEvents } from '../../hooks/useEvents';

export const Home: React.VFC = React.memo(() => {
  const { isLoading } = useUser();
  const { isLoading: eventsIsLoading, handleCreate, handleUpdate, handleRemove } = useEvents();

  if (isLoading) return <Loading />;

  return (
    <>
      <EventForm
        isLoading={eventsIsLoading}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
      <EventList />
    </>
  );
});

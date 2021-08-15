import React from 'react';
import { useUser } from '../../hooks/useUser';
import { Loading } from '../uiParts/Loading';
import { EventForm } from '../EventForm';
import { EventHeader } from './EventHeader';
import { AttendanceForm } from './AttendanceForm';
import { AttendanceTable } from './AttendanceTable';
import { PracticeDetail } from './PracticeDetail';
import { Setting } from './Setting';
import { useEvents } from '../../hooks/useEvents';
import { useEvent } from '../../hooks/useEvent';
import { useAttendances } from '../../hooks/useAttendances';
import { useParts } from '../../hooks/useParts';
import { usePractice } from '../../hooks/usePractice';
import { usePrograms } from '../../hooks/usePrograms';
import { useRoles } from '../../hooks/useRoles';
import { CovidForm } from './CovidForm';
import { useCovids } from '../../hooks/useCovids';
import { CovidResult } from './CovidResult';

type Props = {
  eventId: string;
};
export const Event: React.VFC<Props> = React.memo(({ eventId }) => {
  // domain
  const { parts, isLoading: partsIsLoading, handleUpdate: handlePartsUpdate } = useParts(eventId);
  const {
    practice,
    dateId,
    isLoading: practiceIsLoading,
    handleUpdate: handlePracticeUpdate,
    handleFocusPractice,
  } = usePractice(eventId);
  const {
    programs,
    isLoading: programsIsLoading,
    handleUpdate: handleProgramsUpdate,
  } = usePrograms(eventId);
  const { roles, isLoading: rolesIsLoading, handleUpdate: handleRolesUpdate } = useRoles(eventId);
  const {
    targetEvent,
    isLoading: eventsIsLoading,
    handleCreate: handleEventCreate,
    handleUpdate: handleEventUpdate,
    handleRemove: handleEventRemove,
  } = useEvents(eventId);
  const {
    attendances,
    isLoading: attendanceIsLoading,
    breakdownAttendances,
    handleCreate: handleAttendanceCreate,
    handleUpdate: handleAttendanceUpdate,
    handleRemove: handleAttendanceRemove,
  } = useAttendances(eventId);
  const {
    isLoading: covidsIsLoading,
    answerRuselt,
    unasweredUsers,
    handleFetch,
    handleCreate: handleCovidCreate,
  } = useCovids(eventId);

  // app
  const { isLoading, user } = useUser();
  const { event } = useEvent(targetEvent);

  if (!targetEvent) return null;
  if (isLoading) return <Loading />;

  return (
    <>
      <Setting
        event={targetEvent}
        attendances={attendances}
        parts={parts}
        partsIsLoading={partsIsLoading}
        handlePartsUpdate={handlePartsUpdate}
        practiceIsLoading={practiceIsLoading}
        handlePracticeUpdate={handlePracticeUpdate}
        programs={programs}
        programsIsLoading={programsIsLoading}
        handleProgramsUpdate={handleProgramsUpdate}
        rolesIsLoading={rolesIsLoading}
        handleRolesUpdate={handleRolesUpdate}
      />
      <EventForm
        isLoading={eventsIsLoading}
        handleCreate={handleEventCreate}
        handleUpdate={handleEventUpdate}
        handleRemove={handleEventRemove}
      />
      <EventHeader event={event} />
      <AttendanceForm
        user={user}
        event={targetEvent}
        parts={parts}
        attendances={attendances}
        isLoading={attendanceIsLoading}
        handleCreate={handleAttendanceCreate}
        handleUpdate={handleAttendanceUpdate}
        handleRemove={handleAttendanceRemove}
      />
      <CovidForm event={targetEvent} handleCreate={handleCovidCreate} />
      <AttendanceTable
        user={user}
        event={targetEvent}
        attendances={attendances}
        isLoading={attendanceIsLoading}
        handleFocusPractice={handleFocusPractice}
        programs={programs}
        roles={roles}
        handleFetch={handleFetch}
      />
      <PracticeDetail
        event={targetEvent}
        practice={practice}
        dateId={dateId}
        breakdownAttendances={breakdownAttendances}
      />
      <CovidResult
        isLoading={covidsIsLoading}
        answerRuselt={answerRuselt}
        unasweredUsers={unasweredUsers}
      />
    </>
  );
});

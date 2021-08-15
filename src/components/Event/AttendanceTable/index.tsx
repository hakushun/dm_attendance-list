import React from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { useProgram } from '../../../hooks/useProgram';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Event } from '../../../redux/modules/app/event';
import { ProgramItem } from '../../../redux/modules/app/program';
import { RoleItem } from '../../../redux/modules/app/role';
import { Userdata } from '../../../redux/modules/app/user';
import { Loading } from '../../uiParts/Loading';
import { AttendanceTable as Presentational } from './AttendanceTable';

type Props = {
  user: Userdata;
  event: Event;
  attendances: Attendance[];
  isLoading: boolean;
  handleFocusPractice: (_id: string) => void;
  programs: ProgramItem[];
  roles: RoleItem[];
  handleFetch: (_id: string) => void;
};
export const AttendanceTable: React.VFC<Props> = React.memo(
  ({ user, event, attendances, isLoading, handleFocusPractice, programs, roles, handleFetch }) => {
    const { handleFocusAttendance } = useAttendance();
    const { selectedId, handleFocusProgram } = useProgram();

    if (isLoading) return <Loading />;

    return (
      <Presentational
        user={user}
        event={event}
        attendances={attendances}
        handleFocusPractice={handleFocusPractice}
        programs={programs}
        roles={roles}
        handleFetch={handleFetch}
        handleFocusAttendance={handleFocusAttendance}
        selectedId={selectedId}
        handleFocusProgram={handleFocusProgram}
      />
    );
  },
);

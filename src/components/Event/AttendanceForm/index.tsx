import React from 'react';
import { useAttendance } from '../../../hooks/useAttendance';
import { useShow } from '../../../hooks/useShow';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Event } from '../../../redux/modules/app/event';
import { Part } from '../../../redux/modules/app/part';
import { Userdata } from '../../../redux/modules/app/user';
import { AttendanceForm as Presentational } from './AttendanceForm';

type Props = {
  user: Userdata;
  event: Event;
  parts: Part[];
  attendances: Attendance[];
  isLoading: boolean;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const AttendanceForm: React.VFC<Props> = React.memo(
  ({ user, event, parts, attendances, isLoading, handleCreate, handleUpdate, handleRemove }) => {
    const {
      attendance,
      handleChangeAttendance,
      handleChangeRemark,
      handleClickRadio,
      handleKeyDownRadio,
    } = useAttendance();
    const { attendanceFormIsShown, handleToggleAttendanceForm } = useShow();

    return (
      <Presentational
        user={user}
        event={event}
        parts={parts}
        attendances={attendances}
        isLoading={isLoading}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
        attendance={attendance}
        handleChangeAttendance={handleChangeAttendance}
        handleChangeRemark={handleChangeRemark}
        handleClickRadio={handleClickRadio}
        handleKeyDownRadio={handleKeyDownRadio}
        attendanceFormIsShown={attendanceFormIsShown}
        handleToggleAttendanceForm={handleToggleAttendanceForm}
      />
    );
  },
);

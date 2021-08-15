import React from 'react';
import { useRole } from '../../../../hooks/useRole';
import { Attendance } from '../../../../redux/modules/app/attendance';
import { Part } from '../../../../redux/modules/app/part';
import { ProgramItem } from '../../../../redux/modules/app/program';
import { Loading } from '../../../uiParts/Loading';
import { Role as Presentational } from './Role';

type Props = {
  handleToggleSetting: () => void;
  programs: ProgramItem[];
  parts: Part[];
  attendances: Attendance[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Role: React.VFC<Props> = React.memo(
  ({ handleToggleSetting, programs, parts, attendances, isLoading, handleUpdate }) => {
    const { programId, role, handleChangeRadio, handleChangeRole } = useRole();

    if (isLoading) return <Loading />;

    return (
      <Presentational
        handleToggleSetting={handleToggleSetting}
        programs={programs}
        parts={parts}
        attendances={attendances}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        programId={programId}
        role={role}
        handleChangeRadio={handleChangeRadio}
        handleChangeRole={handleChangeRole}
      />
    );
  },
);

import React from 'react';
import { Event } from '../../../redux/modules/app/event';
import { useTab } from '../../../hooks/useTab';
import { Part as TypePart } from '../../../redux/modules/app/part';
import { Attendance } from '../../../redux/modules/app/attendance';
import { ProgramItem } from '../../../redux/modules/app/program';
import { Setting as Presentational } from './Setting';
import { useShow } from '../../../hooks/useShow';

type Props = {
  event: Event;
  attendances: Attendance[];
  parts: TypePart[];
  partsIsLoading: boolean;
  handlePartsUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  practiceIsLoading: boolean;
  handlePracticeUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  programs: ProgramItem[];
  programsIsLoading: boolean;
  handleProgramsUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rolesIsLoading: boolean;
  handleRolesUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Setting: React.VFC<Props> = React.memo(
  ({
    event,
    attendances,
    parts,
    partsIsLoading,
    handlePartsUpdate,
    practiceIsLoading,
    handlePracticeUpdate,
    programs,
    programsIsLoading,
    handleProgramsUpdate,
    rolesIsLoading,
    handleRolesUpdate,
  }) => {
    const { tab, handleChangeSettingTab } = useTab();
    const { settingIsShown, handleToggleSetting } = useShow();

    if (!settingIsShown) return null;

    return (
      <Presentational
        event={event}
        handleToggleSetting={handleToggleSetting}
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
        tab={tab}
        handleChangeSettingTab={handleChangeSettingTab}
      />
    );
  },
);

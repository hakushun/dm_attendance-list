import clsx from 'clsx';
import React from 'react';
import { Practice } from './Practice';
import { Sectioning } from '../../uiParts/Sectioning';
import { Heading } from '../../uiParts/Heading';
import { Program } from './Program';
import { Part } from './Part';
import { Role } from './Role';
import { Event } from '../../../redux/modules/app/event';
import { Part as TypePart } from '../../../redux/modules/app/part';
import { Attendance } from '../../../redux/modules/app/attendance';
import { ProgramItem } from '../../../redux/modules/app/program';
import styles from './index.module.scss';
import { Tab } from '../../../redux/modules/ui/tab';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
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
  tab: Tab;
  handleChangeSettingTab: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Setting: React.VFC<Props> = React.memo(
  ({
    event,
    handleToggleSetting,
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
    tab,
    handleChangeSettingTab,
  }) => {
    return (
      <Sectioning id="setting">
        <Heading level={2} label="各種設定" />
        <div className={styles.wrapper}>
          <div role="tablist" className={styles.tablist}>
            <button
              role="tab"
              aria-controls="practice"
              aria-selected={tab.setting === 'practice'}
              type="button"
              className={clsx(styles.tab, tab.setting === 'practice' && styles.selected)}
              onClick={handleChangeSettingTab}>
              練習予定
            </button>
            <button
              role="tab"
              aria-controls="program"
              aria-selected={tab.setting === 'program'}
              type="button"
              className={clsx(styles.tab, tab.setting === 'program' && styles.selected)}
              onClick={handleChangeSettingTab}>
              プログラム
            </button>
            <button
              role="tab"
              aria-controls="role"
              aria-selected={tab.setting === 'role'}
              type="button"
              className={clsx(styles.tab, tab.setting === 'role' && styles.selected)}
              onClick={handleChangeSettingTab}>
              乗り番
            </button>
            <button
              role="tab"
              aria-controls="part"
              aria-selected={tab.setting === 'part'}
              type="button"
              className={clsx(styles.tab, tab.setting === 'part' && styles.selected)}
              onClick={handleChangeSettingTab}>
              パート
            </button>
          </div>
          <div role="tabpanel" id={tab.setting} className={styles.tabpanel}>
            {tab.setting === 'practice' && (
              <Practice
                event={event}
                handleToggleSetting={handleToggleSetting}
                isLoading={practiceIsLoading}
                handleUpdate={handlePracticeUpdate}
              />
            )}
            {tab.setting === 'program' && (
              <Program
                event={event}
                handleToggleSetting={handleToggleSetting}
                isLoading={programsIsLoading}
                handleUpdate={handleProgramsUpdate}
              />
            )}
            {tab.setting === 'role' && (
              <Role
                handleToggleSetting={handleToggleSetting}
                programs={programs}
                parts={parts}
                attendances={attendances}
                isLoading={rolesIsLoading}
                handleUpdate={handleRolesUpdate}
              />
            )}
            {tab.setting === 'part' && (
              <Part
                handleToggleSetting={handleToggleSetting}
                isLoading={partsIsLoading}
                handleUpdate={handlePartsUpdate}
              />
            )}
          </div>
        </div>
      </Sectioning>
    );
  },
);

import React from 'react';
import { getRoleValue } from '../../../../libs/utils/getRoleValue';
import { Attendance } from '../../../../redux/modules/app/attendance';
import { Part } from '../../../../redux/modules/app/part';
import { ProgramItem } from '../../../../redux/modules/app/program';
import { RoleItem } from '../../../../redux/modules/app/role';
import { Heading } from '../../../uiParts/Heading';
import { PrimaryButton } from '../../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../../uiParts/SecondaryButton';
import styles from './index.module.scss';

type Props = {
  handleToggleSetting: () => void;
  programs: ProgramItem[];
  parts: Part[];
  attendances: Attendance[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  programId: string;
  role: RoleItem[];
  handleChangeRadio: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Role: React.VFC<Props> = React.memo(
  ({
    handleToggleSetting,
    programs,
    parts,
    attendances,
    isLoading,
    handleUpdate,
    programId,
    role,
    handleChangeRadio,
    handleChangeRole,
  }) => {
    return (
      <>
        <Heading level={3} label="乗り番 登録フォーム" />
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend>プログラムの選択</legend>
            {programs.length === 0 ? (
              <div>先にプログラムを登録して下さい</div>
            ) : (
              <ul role="radiogroup" aria-required className={styles.list}>
                {programs.map((program) => (
                  <li key={program.id} className={styles.radioWrapper}>
                    <input
                      type="radio"
                      id={`role-${program.id}`}
                      name="role_program"
                      value={program.id}
                      disabled={isLoading}
                      className={styles.radio}
                      onChange={handleChangeRadio}
                    />
                    <label htmlFor={`role-${program.id}`} className={styles.radioLabel}>
                      {program.name}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            {programId !== '' && (
              <fieldset className={styles.fieldset}>
                <legend>
                  {programs.find((program) => program.id === programId)?.name}の乗り番入力
                </legend>
                <ul className={styles.list}>
                  {parts.map((part) => (
                    <li key={part.id}>
                      <details>
                        <summary className={styles.summary}>{part.name}</summary>
                        <ul className={styles.wrapper}>
                          {attendances.map(
                            (attendance) =>
                              attendance.part === part.name && (
                                <li key={attendance.userId} className={styles.inputWrapper}>
                                  <label
                                    htmlFor={`role-${attendance.userId}`}
                                    className={styles.label}>
                                    {attendance.name}
                                  </label>
                                  <input
                                    type="text"
                                    id={`role-${attendance.userId}`}
                                    maxLength={20}
                                    autoComplete="off"
                                    disabled={isLoading}
                                    value={getRoleValue(role, attendance.userId, programId)}
                                    className={styles.input}
                                    onChange={handleChangeRole}
                                  />
                                </li>
                              ),
                          )}
                        </ul>
                      </details>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
          </fieldset>
          <PrimaryButton
            type="submit"
            label="乗り番の登録"
            disabled={isLoading}
            handleClick={handleUpdate}
          />
          <SecondaryButton
            label="キャンセル"
            disabled={isLoading}
            handleClick={handleToggleSetting}
          />
        </form>
      </>
    );
  },
);

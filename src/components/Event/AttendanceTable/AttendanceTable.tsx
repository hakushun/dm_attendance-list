import clsx from 'clsx';
import React from 'react';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { convertAttendance } from '../../../libs/utils/convertAttendance';
import { convertOccuoation } from '../../../libs/utils/convertOccupation';
import { getRoleValue } from '../../../libs/utils/getRoleValue';
import { hideColumns } from '../../../libs/utils/hideColumns';
import { showAllColumns } from '../../../libs/utils/showAllColumns';
import { toggleAttendanceRemark } from '../../../libs/utils/toggleAttendanceRemark';
import { exportToExcel } from '../../../libs/xlsx/exportToExcel';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Event } from '../../../redux/modules/app/event';
import { ProgramItem } from '../../../redux/modules/app/program';
import { RoleItem } from '../../../redux/modules/app/role';
import { Userdata } from '../../../redux/modules/app/user';
import { Heading } from '../../uiParts/Heading';
import { OptionalButton } from '../../uiParts/OptionalButton';
import { Sectioning } from '../../uiParts/Sectioning';
import { TernaryButton } from '../../uiParts/TernaryButton';
import styles from './index.module.scss';

type Props = {
  user: Userdata;
  event: Event;
  attendances: Attendance[];
  handleFocusPractice: (_id: string) => void;
  programs: ProgramItem[];
  roles: RoleItem[];
  handleFetch: (_id: string) => void;
  handleFocusAttendance: (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    _item: Attendance,
  ) => void;
  selectedId: string;
  handleFocusProgram: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
};
export const AttendanceTable: React.VFC<Props> = React.memo(
  ({
    user,
    event,
    attendances,
    handleFocusPractice,
    programs,
    roles,
    handleFetch,
    handleFocusAttendance,
    selectedId,
    handleFocusProgram,
  }) => {
    return (
      <Sectioning id="attendance_table">
        <Heading level={3} label={`${event.title}の出欠表`} />
        <ul className={styles.remarks}>
          <li>※出欠作成後の編集は、名前を選択してください</li>
          <li>※練習場所・内容の確認は、日付を選択してください</li>
          <li>※遅刻早退コメントの確認は、〇△×を選択してください</li>
        </ul>
        <div className={styles.wrapper}>
          <table id="xlsx_table" className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <td className={clsx(styles.cell, styles.narrow, styles.button)}>
                  <OptionalButton label="export" disabled={false} handleClick={exportToExcel} />
                </td>
                <td className={clsx(styles.cell, styles.button)}>
                  <TernaryButton label="全列表示" disabled={false} handleClick={showAllColumns} />
                </td>
                <td className={styles.cell}>
                  <select
                    name="role_program"
                    value={selectedId}
                    className={styles.select}
                    onChange={handleFocusProgram}>
                    <option value="">選択して下さい</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </td>
                {event.dates.map((date) => (
                  <td
                    key={date.id}
                    className={clsx(styles.cell, styles.button)}
                    data-columns={`columns-${date.id}`}>
                    <TernaryButton label="列の非表示" disabled={false} handleClick={hideColumns} />
                  </td>
                ))}
              </tr>
              <tr>
                <th className={clsx(styles.cell, styles.head, styles.narrow)}>パート</th>
                <th className={clsx(styles.cell, styles.head)}>名前</th>
                <th className={clsx(styles.cell, styles.head)}>乗り番</th>
                {event.dates.map((date) => (
                  <th
                    key={date.id}
                    className={clsx(styles.cell, styles.head, styles.medium)}
                    data-columns={`columns-${date.id}`}>
                    <div className={styles.actionWrapper}>
                      <button
                        type="button"
                        className={styles.action}
                        onClick={() => handleFocusPractice(date.id)}>
                        <div>
                          {date.day}
                          {getDayOfTheWeek(date.day)}
                        </div>
                        <div>{date.time}</div>
                      </button>
                      <button
                        type="button"
                        className={clsx(styles.action, styles.textSmall)}
                        onClick={() => handleFetch(date.id)}>
                        コロナアンケート結果
                      </button>
                    </div>
                  </th>
                ))}
                <th className={clsx(styles.cell, styles.head, styles.wide)}>コメント</th>
                <th className={clsx(styles.cell, styles.head, styles.narrow)}>区分</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr
                  key={attendance.userId}
                  onClick={(e) => e.currentTarget.classList.toggle('highlight')}>
                  <td className={clsx(styles.cell, styles.body, styles.narrow)}>
                    {attendance.part}
                  </td>
                  <td className={clsx(styles.cell, styles.body)}>
                    {user?.id === attendance.userId ? (
                      <button
                        type="button"
                        className={styles.action}
                        onClick={(e) => handleFocusAttendance(e, attendance)}>
                        {attendance.name}
                      </button>
                    ) : (
                      attendance.name
                    )}
                  </td>
                  <td className={clsx(styles.cell, styles.body)}>
                    {getRoleValue(roles, attendance.userId, selectedId)}
                  </td>
                  {attendance.attendances.map((item) => (
                    <td
                      key={item.dateId}
                      className={clsx(styles.cell, styles.body, styles.medium)}
                      data-columns={`columns-${item.dateId}`}>
                      {item.remark ? (
                        <>
                          <button
                            type="button"
                            onClick={toggleAttendanceRemark}
                            className={styles.action}>
                            {convertAttendance(item.attendance)}
                          </button>
                          <div className={styles.remark} data-type="remark" data-is-shown="false">
                            {item.remark}
                          </div>
                        </>
                      ) : (
                        convertAttendance(item.attendance)
                      )}
                    </td>
                  ))}
                  <td className={clsx(styles.cell, styles.body, styles.wide)}>
                    {attendance.comment}
                  </td>
                  <td className={clsx(styles.cell, styles.body, styles.narrow)}>
                    {convertOccuoation(attendance.occupation)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sectioning>
    );
  },
);

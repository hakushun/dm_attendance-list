import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAttendance,
  changeAttendance,
  changeAttendanceItem,
  AttendanceType,
  Attendance,
  focusAttendance,
} from '../redux/modules/app/attendance';
import { selectUser } from '../redux/modules/app/user';

type Hooks = {
  attendance: Attendance;
  handleChangeAttendance: (
    _e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleChangeRemark: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickRadio: (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  handleKeyDownRadio: (_e: React.KeyboardEvent<HTMLSpanElement>) => void;
  handleFocusAttendance: (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    _item: Attendance,
  ) => void;
};
export const useAttendance = (): Hooks => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const attendance = useSelector(selectAttendance);

  const handleChangeAttendance = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(changeAttendance({ userId: user!.id, [e.target.name]: e.target.value }));
    },
    [dispatch, user],
  );

  const handleChangeRemark = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateId = e.target.id.split('-')[1];
      dispatch(changeAttendanceItem({ dateId, remark: e.target.value }));
    },
    [dispatch],
  );

  const handleClickRadio = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const type = e.currentTarget.id.split('-')[0] as AttendanceType;
      const dateId = e.currentTarget.id.split('-')[1];
      dispatch(changeAttendanceItem({ dateId, attendance: type }));
    },
    [dispatch],
  );

  const handleKeyDownRadio = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      const dateId = e.currentTarget.id.split('-')[1];
      const radiogroup = e.currentTarget.parentElement as HTMLDivElement;
      const radioes = Array.from(radiogroup.querySelectorAll('[role="radio"]')) as HTMLElement[];
      const checkedIndex = radioes.findIndex(
        (radio) => radio.getAttribute('aria-checked') === 'true',
      );

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          if (checkedIndex >= radioes.length - 1) break;
          radioes[checkedIndex + 1].focus();
          dispatch(
            changeAttendanceItem({
              dateId,
              attendance: radioes[checkedIndex + 1].id.split('-')[0] as AttendanceType,
            }),
          );
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          if (checkedIndex <= 0) break;
          radioes[checkedIndex - 1].focus();
          dispatch(
            changeAttendanceItem({
              dateId,
              attendance: radioes[checkedIndex - 1].id.split('-')[0] as AttendanceType,
            }),
          );
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  const handleFocusAttendance = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: Attendance) => {
      e.stopPropagation();
      dispatch(focusAttendance(item));
    },
    [dispatch],
  );

  return {
    attendance,
    handleChangeAttendance,
    handleChangeRemark,
    handleClickRadio,
    handleKeyDownRadio,
    handleFocusAttendance,
  };
};

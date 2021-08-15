import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { isAttendanceInvalid } from '../libs/utils/isAttendanceInvalid';
import { Attendance, selectAttendance } from '../redux/modules/app/attendance';
import {
  create,
  remove,
  selectAttendances,
  selectBreakdownAttendances,
  selectIsLoading,
  subscribeAtendances,
  update,
} from '../redux/modules/domain/attendances';

type Hooks = {
  attendances: Attendance[];
  isLoading: boolean;
  breakdownAttendances: {
    presence: Attendance[];
    undecided: Attendance[];
    absence: Attendance[];
  };
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const useAttendances = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const attendance = useSelector(selectAttendance);
  const attendances = useSelector(selectAttendances);
  const isLoading = useSelector(selectIsLoading);
  const breakdownAttendances = useSelector(selectBreakdownAttendances);

  const handleCreate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!eventId || isAttendanceInvalid(attendance)) return;
      dispatch(create({ eventId, attendance }));
    },
    [attendance, dispatch, eventId],
  );

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!eventId || isAttendanceInvalid(attendance)) return;
      dispatch(update({ eventId, attendance }));
    },
    [attendance, dispatch, eventId],
  );

  const handleRemove = useCallback(() => {
    dispatch(remove({ eventId, attendance }));
  }, [attendance, dispatch, eventId]);

  useEffect(() => {
    const unsubscribe = db
      .collection('attendances')
      .doc(eventId)
      .collection('attendance')
      .onSnapshot((snapshot) => {
        const items: Attendance[] = [];
        snapshot.forEach((doc) => items.push(doc.data() as Attendance));
        dispatch(subscribeAtendances(items));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return { attendances, isLoading, breakdownAttendances, handleCreate, handleUpdate, handleRemove };
};

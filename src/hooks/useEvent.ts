import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStringDate } from '../libs/dayjs/getStringDate';
import {
  addDateForm,
  changeDay,
  changeText,
  changeTime,
  deleteDateForm,
  Event,
  focusEvent,
  initiateEvent,
  selectEvent,
} from '../redux/modules/app/event';
import { useRouter } from './useRouter';

type Hooks = {
  event: Event;
  handleChangeText: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCangeDay: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCangeTime: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDateForm: () => void;
  handleDeleteDateForm: () => void;
  handleFocusEvent: (_value: Event) => void;
};
export const useEvent = (initialState?: Event): Hooks => {
  const dispatch = useDispatch();
  const { router } = useRouter();
  const event = useSelector(selectEvent);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(changeText({ [e.target.name]: e.target.value }));
    },
    [dispatch],
  );

  const handleCangeDay = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const index = parseInt(e.target.id.split('-')[1], 10);
      dispatch(changeDay({ index, day: getStringDate(e.target.value) }));
    },
    [dispatch],
  );

  const handleCangeTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const index = parseInt(e.target.id.split('-')[1], 10);
      dispatch(changeTime({ index, time: e.target.value }));
    },
    [dispatch],
  );

  const handleAddDateForm = useCallback(() => {
    dispatch(addDateForm());
  }, [dispatch]);

  const handleDeleteDateForm = useCallback(() => {
    dispatch(deleteDateForm());
  }, [dispatch]);

  const handleFocusEvent = useCallback(
    (value: Event) => {
      dispatch(focusEvent(value));
    },
    [dispatch],
  );

  useEffect(() => {
    router.pathname === '/' && dispatch(initiateEvent());
    initialState && dispatch(focusEvent(initialState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  return {
    event,
    handleChangeText,
    handleCangeDay,
    handleCangeTime,
    handleAddDateForm,
    handleDeleteDateForm,
    handleFocusEvent,
  };
};

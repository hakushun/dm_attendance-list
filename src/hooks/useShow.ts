import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateAttendance } from '../redux/modules/app/attendance';
import { initiateCovid } from '../redux/modules/app/covid';
import { focusEvent, selectEvent } from '../redux/modules/app/event';
import { selectEvents } from '../redux/modules/domain/events';
import {
  selectEventFormIsShown,
  selectCovidFormIsShown,
  selectAttendanceFormIsShown,
  selectSettingIsShown,
  toggleEventForm,
  toggleSetting,
} from '../redux/modules/ui/show';

type Hooks = {
  eventFormIsShown: boolean;
  covidFormIsShown: boolean;
  attendanceFormIsShown: boolean;
  settingIsShown: boolean;
  handleToggleEventForm: () => void;
  handleToggleCovidForm: () => void;
  handleToggleAttendanceForm: () => void;
  handleToggleSetting: () => void;
};
export const useShow = (): Hooks => {
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const events = useSelector(selectEvents);
  const eventFormIsShown = useSelector(selectEventFormIsShown);
  const covidFormIsShown = useSelector(selectCovidFormIsShown);
  const attendanceFormIsShown = useSelector(selectAttendanceFormIsShown);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleToggleEventForm = useCallback(() => {
    event.id && dispatch(focusEvent(events.find((item) => item.id === event.id)!));
    dispatch(toggleEventForm());
  }, [dispatch, events, event]);
  const handleToggleCovidForm = useCallback(() => {
    dispatch(initiateCovid());
  }, [dispatch]);
  const handleToggleAttendanceForm = useCallback(() => {
    dispatch(initiateAttendance(event));
  }, [dispatch, event]);
  const handleToggleSetting = useCallback(() => {
    dispatch(toggleSetting(!settingIsShown));
  }, [dispatch, settingIsShown]);

  return {
    eventFormIsShown,
    covidFormIsShown,
    attendanceFormIsShown,
    settingIsShown,
    handleToggleEventForm,
    handleToggleCovidForm,
    handleToggleAttendanceForm,
    handleToggleSetting,
  };
};

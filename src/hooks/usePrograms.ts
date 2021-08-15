import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { isProgramInvalid } from '../libs/utils/isProgramInvalid';
import { selectEvent } from '../redux/modules/app/event';
import { ProgramItem, selectProgram } from '../redux/modules/app/program';
import {
  selectIsLoading,
  selectPrograms,
  subscribeProgram,
  update,
} from '../redux/modules/domain/programs';
import { selectSettingIsShown } from '../redux/modules/ui/show';

type Hooks = {
  programs: ProgramItem[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const usePrograms = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const program = useSelector(selectProgram);
  const programs = useSelector(selectPrograms);
  const isLoading = useSelector(selectIsLoading);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isProgramInvalid(program)) return;
      dispatch(update({ event, program }));
    },
    [dispatch, event, program],
  );

  useEffect(() => {
    const unsubscribe = db
      .collection('programs')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as { program: ProgramItem[] } | undefined;
        data && dispatch(subscribeProgram(data.program));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    dispatch(subscribeProgram(programs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingIsShown]);

  return { programs, isLoading, handleUpdate };
};

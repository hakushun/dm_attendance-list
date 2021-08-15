import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { isPartInvalid } from '../libs/utils/isPartInvalid';
import { selectEvent } from '../redux/modules/app/event';
import { Part, selectPart } from '../redux/modules/app/part';
import { selectIsLoading, selectParts, subscribePart, update } from '../redux/modules/domain/parts';
import { selectSettingIsShown } from '../redux/modules/ui/show';

type Hooks = {
  parts: Part[];
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useParts = (eventId: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);
  const part = useSelector(selectPart);
  const parts = useSelector(selectParts);
  const isLoading = useSelector(selectIsLoading);
  const settingIsShown = useSelector(selectSettingIsShown);

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isPartInvalid(part)) return;
      dispatch(update({ event, part }));
    },
    [dispatch, event, part],
  );

  useEffect(() => {
    const unsubscribe = db
      .collection('parts')
      .doc(eventId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data() as { part: Part[] } | undefined;
        data && dispatch(subscribePart(data.part));
      });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    dispatch(subscribePart(parts));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingIsShown]);

  return { parts, isLoading, handleUpdate };
};

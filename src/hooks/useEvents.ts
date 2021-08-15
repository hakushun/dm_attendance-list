import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstance } from '../libs/firestore/getInstance';
import { isEventInvaild } from '../libs/utils/isEventInvalid';
import { Event, selectEvent } from '../redux/modules/app/event';
import {
  create,
  remove,
  selectEvents,
  selectIsLoading,
  subscribeEvents,
  update,
} from '../redux/modules/domain/events';
import { useRouter } from './useRouter';

type Hooks = {
  events: Event[];
  isLoading: boolean;
  targetEvent: Event | undefined;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const useEvents = (eventId?: string): Hooks => {
  const db = getInstance();
  const dispatch = useDispatch();
  const { router } = useRouter();
  const event = useSelector(selectEvent);
  const events = useSelector(selectEvents);
  const isLoading = useSelector(selectIsLoading);
  const targetEvent = events.find((item) => item.id === eventId);

  const handleCreate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (isEventInvaild(event)) return;
      dispatch(create(event));
    },
    [dispatch, event],
  );

  const handleUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!event.id || isEventInvaild(event)) return;
      dispatch(update(event));
    },
    [dispatch, event],
  );

  const handleRemove = useCallback(() => {
    if (!event.id) return;
    dispatch(remove(event));
    router.push('/');
  }, [dispatch, event, router]);

  useEffect(() => {
    const unsubscribe = db.collection('events').onSnapshot((snapshot) => {
      const items: Event[] = [];
      snapshot.forEach((doc) => items.push(doc.data() as Event));
      dispatch(subscribeEvents(items));
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { events, isLoading, targetEvent, handleCreate, handleUpdate, handleRemove };
};

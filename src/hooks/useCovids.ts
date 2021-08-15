import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Attendance } from '../redux/modules/app/attendance';
import { Covid, selectCovid } from '../redux/modules/app/covid';
import {
  create,
  fetch,
  selectAnswerResult,
  selectCovids,
  selectIsLoading,
  selectUnansweredUsers,
} from '../redux/modules/domain/covids';

type Hooks = {
  covids: Covid[];
  isLoading: boolean;
  answerRuselt: (Covid & { name: string | undefined; part: string | undefined })[];
  unasweredUsers: Attendance[];
  handleFetch: (_dateId: string) => void;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useCovids = (eventId: string): Hooks => {
  const dispatch = useDispatch();
  const covid = useSelector(selectCovid);
  const covids = useSelector(selectCovids);
  const isLoading = useSelector(selectIsLoading);
  const answerRuselt = useSelector(selectAnswerResult);
  const unasweredUsers = useSelector(selectUnansweredUsers);

  const handleFetch = useCallback(
    (dateId: string) => {
      dispatch(fetch({ eventId, dateId }));
    },
    [dispatch, eventId],
  );

  const handleCreate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(create({ eventId, covid }));
    },
    [covid, dispatch, eventId],
  );
  return { covids, isLoading, answerRuselt, unasweredUsers, handleFetch, handleCreate };
};

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCovidAnswers,
  changeCovidDate,
  Covid,
  selectCovid,
} from '../redux/modules/app/covid';
import { selectUser } from '../redux/modules/app/user';

type Hooks = {
  covid: Covid;
  handleChangeCovidDate: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeCovidAnswers: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useCovid = (): Hooks => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const covid = useSelector(selectCovid);

  const handleChangeCovidDate = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const userId = user?.id;
      if (!userId || e.target.value === '') return;
      dispatch(changeCovidDate({ userId, dateId: e.target.value }));
    },
    [dispatch, user?.id],
  );

  const handleChangeCovidAnswers = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const question = e.target.name;
      const answer = e.target.id.split('-')[1] as 'yes' | 'no';
      dispatch(changeCovidAnswers({ [question]: answer }));
    },
    [dispatch],
  );

  return { covid, handleChangeCovidDate, handleChangeCovidAnswers };
};

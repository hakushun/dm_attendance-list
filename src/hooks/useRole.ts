import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeRadio,
  changeRole,
  RoleItem,
  selectProgramId,
  selectRole,
} from '../redux/modules/app/role';

type Hooks = {
  programId: string;
  role: RoleItem[];
  handleChangeRadio: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeRole: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useRole = (): Hooks => {
  const dispatch = useDispatch();
  const programId = useSelector(selectProgramId);
  const role = useSelector(selectRole);

  const handleChangeRadio = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeRadio({ programId: e.target.value }));
    },
    [dispatch],
  );

  const handleChangeRole = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const userId = e.target.id.split('-')[1];
      dispatch(changeRole({ userId, [programId]: e.target.value }));
    },
    [dispatch, programId],
  );

  return { programId, role, handleChangeRadio, handleChangeRole };
};

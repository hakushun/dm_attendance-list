import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRemark, Remark, selectRemarks } from '../redux/modules/app/remarks';

type Hooks = {
  remarks: Remark[];
  handleChangeRemarks: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export const useRemarks = (): Hooks => {
  const dispatch = useDispatch();
  const remarks = useSelector(selectRemarks);

  const handleChangeRemarks = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const dateId = e.target.id.split('-')[1];
      dispatch(changeRemark({ dateId, [e.target.name]: e.target.value }));
    },
    [dispatch],
  );

  return { remarks, handleChangeRemarks };
};

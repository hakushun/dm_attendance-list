import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPart,
  changePart,
  addPartForm,
  deletePartForm,
  Part,
  changeOrder,
  ChangeOrderPayload,
} from '../redux/modules/app/part';

type Hooks = {
  part: Part[];
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPartForm: () => void;
  handleDeletePartForm: () => void;
  handleChangeOrder: (_: ChangeOrderPayload) => void;
};
export const usePart = (): Hooks => {
  const dispatch = useDispatch();
  const part = useSelector(selectPart);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.id.split('-')[1];
      dispatch(changePart({ id, name: e.target.value }));
    },
    [dispatch],
  );

  const handleAddPartForm = useCallback(() => {
    dispatch(addPartForm());
  }, [dispatch]);

  const handleDeletePartForm = useCallback(() => {
    dispatch(deletePartForm());
  }, [dispatch]);

  const handleChangeOrder = useCallback(
    ({ index, order }: ChangeOrderPayload) => {
      if (index === 0 && order < 0) return;
      if (index === part.length - 1 && order > 0) return;
      dispatch(changeOrder({ index, order }));
    },
    [dispatch, part.length],
  );

  return { part, handleChange, handleAddPartForm, handleDeletePartForm, handleChangeOrder };
};

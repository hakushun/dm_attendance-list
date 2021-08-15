import React from 'react';
import { usePart } from '../../../../hooks/usePart';
import { Loading } from '../../../uiParts/Loading';
import { Part as Presentational } from './Part';

type Props = {
  handleToggleSetting: () => void;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Part: React.VFC<Props> = React.memo(
  ({ handleToggleSetting, isLoading, handleUpdate }) => {
    const { part, handleChange, handleAddPartForm, handleDeletePartForm, handleChangeOrder } =
      usePart();

    if (isLoading) return <Loading />;

    return (
      <Presentational
        handleToggleSetting={handleToggleSetting}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        part={part}
        handleChange={handleChange}
        handleAddPartForm={handleAddPartForm}
        handleDeletePartForm={handleDeletePartForm}
        handleChangeOrder={handleChangeOrder}
      />
    );
  },
);

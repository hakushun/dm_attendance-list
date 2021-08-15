import React from 'react';
import { useLocations } from '../../../../hooks/useLocations';
import { usePlans } from '../../../../hooks/usePlans';
import { useRemarks } from '../../../../hooks/useRemarks';
import { Event } from '../../../../redux/modules/app/event';
import { Loading } from '../../../uiParts/Loading';
import { Practice as Presentational } from './Practice';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Practice: React.VFC<Props> = React.memo(
  ({ event, handleToggleSetting, isLoading, handleUpdate }) => {
    const { locations, handleChangeLocations } = useLocations();
    const { plans, handleChangePlans } = usePlans();
    const { remarks, handleChangeRemarks } = useRemarks();

    if (isLoading) return <Loading />;

    return (
      <Presentational
        event={event}
        handleToggleSetting={handleToggleSetting}
        isLoading={isLoading}
        handleUpdate={handleUpdate}
        locations={locations}
        handleChangeLocations={handleChangeLocations}
        plans={plans}
        handleChangePlans={handleChangePlans}
        remarks={remarks}
        handleChangeRemarks={handleChangeRemarks}
      />
    );
  },
);

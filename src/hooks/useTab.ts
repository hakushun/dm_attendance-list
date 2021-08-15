import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, selectTab, Tab, Value } from '../redux/modules/ui/tab';

type CustomHooks = () => {
  tab: Tab;
  handleChangeSettingTab: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useTab: CustomHooks = () => {
  const dispatch = useDispatch();
  const tab = useSelector(selectTab);

  const handleChangeSettingTab = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = e.currentTarget;
      const value = target.getAttribute('aria-controls') as Value;
      dispatch(change({ setting: value }));
    },
    [dispatch],
  );

  return { tab, handleChangeSettingTab };
};

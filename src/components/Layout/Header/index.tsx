import React from 'react';
import { useRouter } from '../../../hooks/useRouter';
import { useShow } from '../../../hooks/useShow';
import { useSign } from '../../../hooks/useSign';
import { useUser } from '../../../hooks/useUser';
import { Header as Presentational } from './Header';

export const Header: React.VFC = React.memo(() => {
  const { router } = useRouter();
  const { user } = useUser();
  const { handleSignOut } = useSign();
  const { handleToggleEventForm, handleToggleSetting } = useShow();

  return (
    <Presentational
      router={router}
      user={user}
      handleSignOut={handleSignOut}
      handleToggleEventForm={handleToggleEventForm}
      handleToggleSetting={handleToggleSetting}
    />
  );
});

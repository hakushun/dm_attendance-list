import React from 'react';
import { useSign } from '../../hooks/useSign';
import { SignUp as Presentational } from './SignUp';

export const SignUp: React.VFC = React.memo(() => {
  const { form, isLoading, handleChange, handleSignUp } = useSign();

  return (
    <Presentational
      form={form}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSignUp={handleSignUp}
    />
  );
});

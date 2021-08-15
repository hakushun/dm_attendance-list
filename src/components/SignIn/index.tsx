import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useSign } from '../../hooks/useSign';
import { SignIn as Presentational } from './SignIn';

export const SignIn: React.VFC = React.memo(() => {
  const {
    form,
    resetForm,
    isLoading,
    handleChange,
    handleChangeResetForm,
    handleSignIn,
    handleResetPassword,
  } = useSign();
  const { modalRef, passwordResetIsShown, handleTogglePasswordReset, handleKeydown } = useModal();

  return (
    <Presentational
      form={form}
      resetForm={resetForm}
      isLoading={isLoading}
      handleChange={handleChange}
      handleChangeResetForm={handleChangeResetForm}
      handleSignIn={handleSignIn}
      handleResetPassword={handleResetPassword}
      modalRef={modalRef}
      passwordResetIsShown={passwordResetIsShown}
      handleTogglePasswordReset={handleTogglePasswordReset}
      handleKeydown={handleKeydown}
    />
  );
});

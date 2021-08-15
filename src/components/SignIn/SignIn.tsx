import React, { MutableRefObject } from 'react';
import { isSignFormInvalid } from '../../libs/utils/isSignFormInvalid';
import { Badge } from '../uiParts/Badge';
import { Heading } from '../uiParts/Heading';
import { LinkButton } from '../uiParts/LinkButton';
import { PrimaryButton } from '../uiParts/PrimaryButton';
import { Sectioning } from '../uiParts/Sectioning';
import { PasswordReset } from './PasswordReset';
import { SignForm } from '../../redux/modules/app/sign';
import styles from './index.module.scss';

type Props = {
  form: SignForm;
  resetForm: { email: string };
  isLoading: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeResetForm: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignIn: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  handleResetPassword: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  modalRef: MutableRefObject<HTMLElement | null>;
  passwordResetIsShown: boolean;
  handleTogglePasswordReset: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};
export const SignIn: React.VFC<Props> = React.memo(
  ({
    form,
    resetForm,
    isLoading,
    handleChange,
    handleChangeResetForm,
    handleSignIn,
    handleResetPassword,
    modalRef,
    passwordResetIsShown,
    handleTogglePasswordReset,
    handleKeydown,
  }) => {
    return (
      <Sectioning id="signin_form">
        <form className={styles.form}>
          <fieldset>
            <legend>
              <Heading level={2} label="Loginフォーム" />
            </legend>
            <div className={styles.inputWrapper}>
              <label htmlFor="email" className={styles.label}>
                Email:
                <Badge type="required" />
              </label>
              <input
                type="email"
                id="email"
                required
                aria-required
                name="email"
                placeholder="Email Address"
                disabled={isLoading}
                className={styles.input}
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password" className={styles.label}>
                Password:
                <Badge type="required" />
              </label>
              <input
                type="password"
                id="password"
                required
                aria-required
                name="current-password"
                autoComplete="current-password"
                placeholder="Password"
                disabled={isLoading}
                className={styles.input}
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <PrimaryButton
            type="submit"
            label="Login"
            disabled={isLoading || isSignFormInvalid(form)}
            handleClick={handleSignIn}
          />
        </form>
        <div className={styles.wrapper}>
          既に登録済みの方は下記よりログインください
          <LinkButton href="/signup" label="Sign Upフォームへ" />
        </div>
        <div className={styles.wrapper}>
          パスワードを忘れた方はこちら
          <button type="button" className={styles.resetButton} onClick={handleTogglePasswordReset}>
            パスワードリセット
          </button>
        </div>
        {passwordResetIsShown && (
          <PasswordReset
            resetForm={resetForm}
            isLoading={isLoading}
            handleChange={handleChangeResetForm}
            handleResetPassword={handleResetPassword}
            modalRef={modalRef}
            handleTogglePasswordReset={handleTogglePasswordReset}
            handleKeydown={handleKeydown}
          />
        )}
      </Sectioning>
    );
  },
);

import React from 'react';
import { PrimaryButton } from '../uiParts/PrimaryButton';
import { LinkButton } from '../uiParts/LinkButton';
import { Heading } from '../uiParts/Heading';
import { Sectioning } from '../uiParts/Sectioning';
import { isSignFormInvalid } from '../../libs/utils/isSignFormInvalid';
import { Badge } from '../uiParts/Badge';
import { SignForm } from '../../redux/modules/app/sign';
import styles from './index.module.scss';

type Props = {
  form: SignForm;
  isLoading: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
};
export const SignUp: React.VFC<Props> = React.memo(
  ({ form, isLoading, handleChange, handleSignUp }) => {
    return (
      <Sectioning id="signup_form">
        <form className={styles.form}>
          <fieldset>
            <legend>
              <Heading level={2} label="Sign Upフォーム" />
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
                minLength={6}
                name="new-password"
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
            label="Sign Up"
            disabled={isLoading || isSignFormInvalid(form)}
            handleClick={handleSignUp}
          />
        </form>
        <div className={styles.wrapper}>
          未登録の方は下記より利用登録をしてください
          <LinkButton href="/login" label="Loginフォームへ" />
        </div>
      </Sectioning>
    );
  },
);

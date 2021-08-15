import React, { MutableRefObject } from 'react';
import { isEmail } from '../../../libs/utils/isEmail';
import { Badge } from '../../uiParts/Badge';
import { Heading } from '../../uiParts/Heading';
import { Modal } from '../../uiParts/Modal';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import styles from './index.module.scss';

type Props = {
  resetForm: { email: string };
  isLoading: boolean;
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  modalRef: MutableRefObject<HTMLElement | null>;
  handleTogglePasswordReset: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
  handleResetPassword: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
};
export const PasswordReset: React.VFC<Props> = React.memo(
  ({
    resetForm,
    isLoading,
    handleChange,
    modalRef,
    handleTogglePasswordReset,
    handleKeydown,
    handleResetPassword,
  }) => {
    return (
      <Modal modalRef={modalRef} handleKeydown={handleKeydown}>
        <form className={styles.form}>
          <fieldset>
            <legend>
              <Heading level={3} label="パスワードリセットフォーム" />
            </legend>
            <p className={styles.annotation}>
              登録いただいたメールアドレスを入力ください
              <br />
              送られるメールに従いパスワードを変更ください
            </p>
            <div className={styles.inputWrapper}>
              <label htmlFor="reset_email" className={styles.label}>
                Email:
                <Badge type="required" />
              </label>
              <input
                type="email"
                id="reset_email"
                required
                aria-required
                name="email"
                placeholder="Email Address"
                disabled={isLoading}
                className={styles.input}
                value={resetForm.email}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <PrimaryButton
            type="submit"
            label="リセットメールの送信"
            disabled={isLoading || !isEmail(resetForm.email)}
            handleClick={handleResetPassword}
          />
          <SecondaryButton
            label="キャンセル"
            disabled={isLoading}
            handleClick={handleTogglePasswordReset}
          />
        </form>
      </Modal>
    );
  },
);

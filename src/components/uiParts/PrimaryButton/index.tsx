import React from 'react';
import styles from './index.module.scss';

type Props = {
  type: 'button' | 'submit';
  label: string;
  disabled: boolean;
  handleClick: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const PrimaryButton: React.VFC<Props> = React.memo(
  ({ type, label, disabled, handleClick }) => {
    return (
      <button type={type} className={styles.root} disabled={disabled} onClick={handleClick}>
        {label}
      </button>
    );
  },
);

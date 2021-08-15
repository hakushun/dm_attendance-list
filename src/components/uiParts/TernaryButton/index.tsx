import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
  disabled: boolean;
  handleClick: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const TernaryButton: React.VFC<Props> = React.memo(({ label, disabled, handleClick }) => {
  return (
    <button type="button" disabled={disabled} onClick={handleClick} className={styles.root}>
      {label}
    </button>
  );
});

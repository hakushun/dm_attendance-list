import React from 'react';
import styles from './index.module.scss';

type Props = {
  label: string;
  disabled: boolean;
  handleClick: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const OptionalButton: React.VFC<Props> = React.memo(({ label, disabled, handleClick }) => {
  return (
    <button type="button" disabled={disabled} className={styles.root} onClick={handleClick}>
      {label}
    </button>
  );
});

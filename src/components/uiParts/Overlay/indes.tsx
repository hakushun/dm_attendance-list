import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

export const Overlay: React.FC = React.memo(({ children }) => {
  if (typeof window !== 'undefined') {
    return ReactDOM.createPortal(
      <div className={styles.root}>{children}</div>,
      document.getElementById('overlay')!,
    );
  }
  return null;
});

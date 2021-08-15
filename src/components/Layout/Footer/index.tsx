import React from 'react';
import styles from './index.module.scss';

export const Footer: React.VFC = React.memo(() => {
  return (
    <footer className={styles.root}>
      <small>© 2021 Fellow Orchestra</small>
    </footer>
  );
});

import React from 'react';
import styles from './index.module.scss';

type Props = {
  id: string;
};
export const Sectioning: React.FC<Props> = React.memo(({ id, children }) => {
  return (
    <section id={id} tabIndex={-1} className={styles.root}>
      {children}
    </section>
  );
});

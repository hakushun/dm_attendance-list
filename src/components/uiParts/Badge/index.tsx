import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

type Props = {
  type: 'required' | 'optional';
};
export const Badge: React.VFC<Props> = React.memo(({ type }) => {
  if (type === 'required') {
    return <span className={clsx(styles.root, styles.required)}>必須</span>;
  }
  if (type === 'optional') {
    return <span className={clsx(styles.root, styles.optional)}>任意</span>;
  }
  return null;
});

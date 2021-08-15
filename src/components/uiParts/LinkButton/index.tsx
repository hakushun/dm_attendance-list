import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

type Props = {
  href: string;
  label: string;
};
export const LinkButton: React.VFC<Props> = React.memo(({ href, label }) => {
  return (
    <Link href={href}>
      <a className={styles.root}>{label}</a>
    </Link>
  );
});

import React from 'react';
import { Overlay } from '../Overlay/indes';
import styles from './index.module.scss';

type Props = {
  modalRef: React.MutableRefObject<HTMLElement | null>;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};
export const Modal: React.FC<Props> = React.memo(({ modalRef, handleKeydown, children }) => {
  return (
    <Overlay>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <section
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
        className={styles.root}
        onKeyDown={handleKeydown}>
        {children}
      </section>
    </Overlay>
  );
});

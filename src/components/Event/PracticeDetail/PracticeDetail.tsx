import React, { MutableRefObject } from 'react';
import { Attendance } from '../../../redux/modules/app/attendance';
import { PracticeItem } from '../../../redux/modules/domain/practice';
import { Heading } from '../../uiParts/Heading';
import { Modal } from '../../uiParts/Modal';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import { StringWithUrl } from '../../uiParts/StringWithUrl';
import styles from './index.module.scss';

type Props = {
  practice: PracticeItem;
  dateId: string;
  breakdownAttendances: {
    presence: Attendance[];
    undecided: Attendance[];
    absence: Attendance[];
  };
  modalRef: MutableRefObject<HTMLElement | null>;
  handleTogglePracticeModal: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
  titleDate: string;
  titleDayOfTheWeek: string;
  url: string | undefined;
  content: string | undefined;
};
export const PracticeDetail: React.VFC<Props> = React.memo(
  ({
    practice,
    dateId,
    breakdownAttendances,
    modalRef,
    handleTogglePracticeModal,
    handleKeydown,
    titleDate,
    titleDayOfTheWeek,
    url,
    content,
  }) => {
    return (
      <Modal modalRef={modalRef} handleKeydown={handleKeydown}>
        <div className={styles.root}>
          <Heading level={3} label={`${titleDate}${titleDayOfTheWeek}の詳細`} />
          <dl className={styles.list}>
            <div className={styles.item}>
              <dt className={styles.term}>施設1</dt>
              <dd className={styles.definition}>
                {practice.locations.find((loc) => loc.dateId === dateId)?.name1 || '未入力'}
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>施設2</dt>
              <dd className={styles.definition}>
                {practice.locations.find((loc) => loc.dateId === dateId)?.name2 || '未入力'}
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>URL</dt>
              <dd className={styles.definition}>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                ) : (
                  '未入力'
                )}
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>区分</dt>
              <dd className={styles.definition}>
                {practice.plans.find((pln) => pln.dateId === dateId)?.category || '未入力'}
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>スケジュール</dt>
              <dd className={styles.definition}>
                {practice.plans.find((pln) => pln.dateId === dateId)?.schedule || '未入力'}
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>備考</dt>
              <dd className={styles.definition}>
                {content ? <StringWithUrl content={content} /> : '未入力'}
              </dd>
            </div>
            <div className={styles.item}>
              <dt className={styles.term}>出欠</dt>
              <dd className={styles.definition}>
                <div>○：{breakdownAttendances.presence.length}</div>
                <div>△：{breakdownAttendances.undecided.length}</div>
                <div>×：{breakdownAttendances.absence.length}</div>
              </dd>
            </div>
          </dl>
          <SecondaryButton
            label="閉じる"
            disabled={false}
            handleClick={handleTogglePracticeModal}
          />
        </div>
      </Modal>
    );
  },
);

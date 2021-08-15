import clsx from 'clsx';
import React, { MutableRefObject } from 'react';
import { questions } from '../../../config/questions';
import { parseTimestamp } from '../../../libs/dayjs/parseTimestamp';
import { Attendance } from '../../../redux/modules/app/attendance';
import { Covid } from '../../../redux/modules/app/covid';
import { Heading } from '../../uiParts/Heading';
import { Loading } from '../../uiParts/Loading';
import { Modal } from '../../uiParts/Modal';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import styles from './index.module.scss';

type Props = {
  isLoading: boolean;
  answerRuselt: (Covid & { name: string | undefined; part: string | undefined })[];
  unasweredUsers: Attendance[];
  modalRef: MutableRefObject<HTMLElement | null>;
  handleToggleCovidResult: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};
export const CovidResult: React.VFC<Props> = React.memo(
  ({
    isLoading,
    answerRuselt,
    unasweredUsers,
    modalRef,
    handleToggleCovidResult,
    handleKeydown,
  }) => {
    return (
      <Modal modalRef={modalRef} handleKeydown={handleKeydown}>
        <div className={styles.root}>
          <Heading level={3} label="コロナアンケート回答結果" />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <h4 className={styles.subtitle}>未回答者</h4>
              <div className={styles.wrapper}>
                {unasweredUsers.length === 0 ? (
                  <div>未回答者なし</div>
                ) : (
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th className={clsx(styles.cell, styles.head)}>パート</th>
                        <th className={clsx(styles.cell, styles.head, styles.medium)}>名前</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unasweredUsers.map((user) => (
                        <tr key={user.userId}>
                          <td className={clsx(styles.cell, styles.body)}>{user.part}</td>
                          <td className={clsx(styles.cell, styles.body, styles.medium)}>
                            {user.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <h4 className={styles.subtitle}>回答一覧</h4>
              <div className={styles.wrapper}>
                {answerRuselt.length === 0 ? (
                  <div>回答者なし</div>
                ) : (
                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th className={clsx(styles.cell, styles.head)}>パート</th>
                        <th className={clsx(styles.cell, styles.head, styles.medium)}>名前</th>
                        {questions.map((question, index) => (
                          <th key={question.id} className={clsx(styles.cell, styles.head)}>{`Q${
                            index + 1
                          }`}</th>
                        ))}
                        <th className={clsx(styles.cell, styles.head)}>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {answerRuselt.map((result) => (
                        <tr key={result.userId}>
                          <td className={clsx(styles.cell, styles.body)}>{result.part}</td>
                          <td className={clsx(styles.cell, styles.body, styles.medium)}>
                            {result.name}
                          </td>
                          {questions.map((question) => (
                            <td key={question.id} className={clsx(styles.cell, styles.body)}>
                              {result.answers[question.id]}
                            </td>
                          ))}
                          <td className={clsx(styles.cell, styles.body)}>
                            {parseTimestamp(result.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <SecondaryButton
                label="閉じる"
                disabled={false}
                handleClick={handleToggleCovidResult}
              />
            </>
          )}
        </div>
      </Modal>
    );
  },
);

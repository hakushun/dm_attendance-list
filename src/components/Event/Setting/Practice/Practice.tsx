import clsx from 'clsx';
import React from 'react';
import { Event } from '../../../../redux/modules/app/event';
import { Location } from '../../../../redux/modules/app/locations';
import { Plan } from '../../../../redux/modules/app/plans';
import { Remark } from '../../../../redux/modules/app/remarks';
import { Badge } from '../../../uiParts/Badge';
import { Heading } from '../../../uiParts/Heading';
import { PrimaryButton } from '../../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../../uiParts/SecondaryButton';
import styles from './index.module.scss';

type Props = {
  event: Event;
  handleToggleSetting: () => void;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  locations: Location[];
  handleChangeLocations: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  plans: Plan[];
  handleChangePlans: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  remarks: Remark[];
  handleChangeRemarks: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
export const Practice: React.VFC<Props> = React.memo(
  ({
    event,
    handleToggleSetting,
    isLoading,
    handleUpdate,
    locations,
    handleChangeLocations,
    plans,
    handleChangePlans,
    remarks,
    handleChangeRemarks,
  }) => {
    return (
      <>
        <Heading level={3} label="練習予定 登録フォーム" />
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend>{event.title}の練習予定</legend>
            <ul className={styles.list}>
              {event.dates.map((date) => (
                <li key={date.id}>
                  <details>
                    <summary className={styles.summary}>{date.day}の予定</summary>
                    <div className={styles.wrapper}>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`name1-${date.id}`} className={styles.label}>
                          施設1
                          <Badge type="optional" />
                        </label>
                        <input
                          type="text"
                          name="name1"
                          id={`name1-${date.id}`}
                          maxLength={30}
                          autoComplete="off"
                          disabled={isLoading}
                          value={
                            locations.find((location) => location.dateId === date.id)?.name1 || ''
                          }
                          onChange={handleChangeLocations}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`name2-${date.id}`} className={styles.label}>
                          施設2
                          <Badge type="optional" />
                        </label>
                        <input
                          type="text"
                          name="name2"
                          id={`name2-${date.id}`}
                          maxLength={30}
                          autoComplete="off"
                          disabled={isLoading}
                          value={
                            locations.find((location) => location.dateId === date.id)?.name2 || ''
                          }
                          onChange={handleChangeLocations}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`url-${date.id}`} className={styles.label}>
                          URL
                          <Badge type="optional" />
                        </label>
                        <input
                          type="url"
                          name="url"
                          id={`url-${date.id}`}
                          autoComplete="off"
                          disabled={isLoading}
                          value={
                            locations.find((location) => location.dateId === date.id)?.url || ''
                          }
                          onChange={handleChangeLocations}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`category-${date.id}`} className={styles.label}>
                          区分
                          <Badge type="optional" />
                        </label>
                        <input
                          type="text"
                          name="category"
                          id={`category-${date.id}`}
                          maxLength={30}
                          autoComplete="off"
                          disabled={isLoading}
                          value={plans.find((plan) => plan.dateId === date.id)?.category || ''}
                          onChange={handleChangePlans}
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`schedule-${date.id}`} className={styles.label}>
                          スケジュール
                          <Badge type="optional" />
                        </label>
                        <textarea
                          name="schedule"
                          id={`schedule-${date.id}`}
                          maxLength={300}
                          value={plans.find((plan) => plan.dateId === date.id)?.schedule || ''}
                          onChange={handleChangePlans}
                          className={clsx(styles.input, styles.textarea)}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <label htmlFor={`content-${date.id}`} className={styles.label}>
                          備考
                          <Badge type="optional" />
                        </label>
                        <textarea
                          name="content"
                          id={`content-${date.id}`}
                          maxLength={500}
                          value={remarks.find((remark) => remark.dateId === date.id)?.content || ''}
                          onChange={handleChangeRemarks}
                          className={clsx(styles.input, styles.textarea)}
                        />
                      </div>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </fieldset>
          <PrimaryButton
            type="submit"
            label="練習予定の登録"
            disabled={isLoading}
            handleClick={handleUpdate}
          />
          <SecondaryButton
            label="キャンセル"
            disabled={isLoading}
            handleClick={handleToggleSetting}
          />
        </form>
      </>
    );
  },
);

import clsx from 'clsx';
import React from 'react';
import { isEventInvaild } from '../../libs/utils/isEventInvalid';
import { Event } from '../../redux/modules/app/event';
import { Badge } from '../uiParts/Badge';
import { Heading } from '../uiParts/Heading';
import { OptionalButton } from '../uiParts/OptionalButton';
import { PrimaryButton } from '../uiParts/PrimaryButton';
import { SecondaryButton } from '../uiParts/SecondaryButton';
import { Sectioning } from '../uiParts/Sectioning';
import { TernaryButton } from '../uiParts/TernaryButton';
import styles from './index.module.scss';

type Props = {
  eventFormIsShown: boolean;
  handleToggleEventForm: () => void;
  event: Event;
  handleChangeText: (_e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCangeDay: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCangeTime: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddDateForm: () => void;
  handleDeleteDateForm: () => void;
  isLoading: boolean;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleRemove: () => void;
};
export const EventForm: React.VFC<Props> = React.memo(
  ({
    eventFormIsShown,
    handleToggleEventForm,
    event,
    handleChangeText,
    handleCangeDay,
    handleCangeTime,
    handleAddDateForm,
    handleDeleteDateForm,
    isLoading,
    handleCreate,
    handleUpdate,
    handleRemove,
  }) => {
    return (
      <Sectioning id="event_form">
        {eventFormIsShown && (
          <form className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend>
                <Heading level={2} label="イベント作成フォーム" />
              </legend>
              <div className={styles.inputWrapper}>
                <label htmlFor="event_title" className={styles.label}>
                  イベント名
                  <Badge type="required" />
                </label>
                <input
                  type="text"
                  name="title"
                  id="event_title"
                  required
                  aria-required
                  maxLength={30}
                  placeholder="イベント名を入力ください"
                  autoComplete="off"
                  disabled={isLoading}
                  value={event.title}
                  onChange={handleChangeText}
                  className={clsx(styles.input, styles.text)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="event_detail" className={styles.label}>
                  イベント詳細
                  <Badge type="optional" />
                </label>
                <textarea
                  id="event_detail"
                  name="detail"
                  maxLength={1000}
                  placeholder="イベント詳細を入力ください"
                  disabled={isLoading}
                  value={event.detail}
                  onChange={handleChangeText}
                  className={clsx(styles.input, styles.textarea)}
                />
              </div>
              <div className={styles.inputWrapper}>
                <fieldset className={styles.fieldset}>
                  <legend className={styles.label}>
                    練習日時
                    <Badge type="required" />
                  </legend>
                  <ul className={styles.list}>
                    {event.dates.map((date, index) => (
                      <li key={date.id} className={styles.item}>
                        <div className={styles.dateWrapper}>
                          <label htmlFor={`event_day-${index}`} className={styles.label}>
                            日付 {index + 1}
                          </label>
                          <input
                            type="date"
                            id={`event_day-${index}`}
                            required
                            aria-required
                            disabled={isLoading}
                            value={event.dates[index].day}
                            onChange={handleCangeDay}
                            className={clsx(styles.input, styles.date)}
                          />
                        </div>
                        <div className={styles.dateWrapper}>
                          <label htmlFor={`event_time-${index}`} className={styles.label}>
                            時間 {index + 1}
                          </label>
                          <input
                            type="text"
                            id={`event_time-${index}`}
                            required
                            aria-required
                            autoComplete="off"
                            maxLength={15}
                            placeholder={`日付 ${index + 1}の練習時間を入力ください`}
                            disabled={isLoading}
                            value={event.dates[index].time}
                            onChange={handleCangeTime}
                            className={clsx(styles.input, styles.date)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.action}>
                    <TernaryButton
                      label="追加"
                      disabled={isLoading}
                      handleClick={handleAddDateForm}
                    />
                    <TernaryButton
                      label="削除"
                      disabled={isLoading}
                      handleClick={handleDeleteDateForm}
                    />
                  </div>
                </fieldset>
              </div>
            </fieldset>
            <PrimaryButton
              type="submit"
              label={event.id ? `${event.title}の更新` : 'イベントの作成'}
              disabled={isLoading || isEventInvaild(event)}
              handleClick={event.id ? handleUpdate : handleCreate}
            />
            <SecondaryButton
              label="キャンセル"
              disabled={isLoading}
              handleClick={handleToggleEventForm}
            />
            {event.id && (
              <OptionalButton
                label={`${event.title}の削除`}
                disabled={isLoading}
                handleClick={handleRemove}
              />
            )}
          </form>
        )}
      </Sectioning>
    );
  },
);

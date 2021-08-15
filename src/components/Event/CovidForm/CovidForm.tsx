import React from 'react';
import { questions } from '../../../config/questions';
import { getDayOfTheWeek } from '../../../libs/dayjs/getDayOfTheWeek';
import { getStringDate } from '../../../libs/dayjs/getStringDate';
import { Covid } from '../../../redux/modules/app/covid';
import { Event } from '../../../redux/modules/app/event';
import { Badge } from '../../uiParts/Badge';
import { Heading } from '../../uiParts/Heading';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../uiParts/SecondaryButton';
import { Sectioning } from '../../uiParts/Sectioning';
import styles from './index.module.scss';

type Props = {
  event: Event;
  handleCreate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  covid: Covid;
  handleChangeCovidDate: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeCovidAnswers: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  covidFormIsShown: boolean;
  handleToggleCovidForm: () => void;
};
export const CovidForm: React.VFC<Props> = React.memo(
  ({
    event,
    handleCreate,
    covid,
    handleChangeCovidDate,
    handleChangeCovidAnswers,
    covidFormIsShown,
    handleToggleCovidForm,
  }) => {
    return (
      <Sectioning id="covid_form">
        {covidFormIsShown ? (
          <form className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend>
                <Heading level={3} label="コロナアンケート" />
              </legend>
              <div className={styles.remark}>
                出欠作成後に回答してください
                <br />
                一つでも当てはまる場合はお休みください
              </div>
              <div className={styles.inputWrapper}>
                <label htmlFor="covid_date" className={styles.label}>
                  日付
                  <Badge type="required" />
                </label>
                <select
                  name="date"
                  id="covid_date"
                  required
                  aria-required
                  value={covid.dateId}
                  className={styles.select}
                  onChange={handleChangeCovidDate}>
                  <option value="">選択して下さい</option>
                  {event.dates.map((date) => (
                    <option key={date.id} value={date.id}>
                      {getStringDate(date.day)}
                      {getDayOfTheWeek(date.day)} {date.time}
                    </option>
                  ))}
                </select>
              </div>
              {questions.map((question) => (
                <div key={question.id} className={styles.inputWrapper}>
                  <fieldset key={question.id} className={styles.fieldset}>
                    <legend>
                      <div className={styles.question}>
                        {question.name}
                        <Badge type="required" />
                      </div>
                    </legend>
                    <div role="radiogroup" aria-required className={styles.radiogroup}>
                      <div className={styles.radioWrapper}>
                        <input
                          type="radio"
                          id={`${question.id}-no`}
                          name={question.id}
                          checked={covid.answers[question.id] === 'no'}
                          className={styles.radio}
                          onChange={handleChangeCovidAnswers}
                        />
                        <label htmlFor={`${question.id}-no`} className={styles.radioLabel}>
                          いいえ
                        </label>
                      </div>
                      <div className={styles.radioWrapper}>
                        <input
                          type="radio"
                          id={`${question.id}-yes`}
                          name={question.id}
                          checked={covid.answers[question.id] === 'yes'}
                          className={styles.radio}
                          onChange={handleChangeCovidAnswers}
                        />
                        <label htmlFor={`${question.id}-yes`} className={styles.radioLabel}>
                          はい
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              ))}
            </fieldset>
            <PrimaryButton
              type="submit"
              label="回答の登録"
              disabled={false}
              handleClick={handleCreate}
            />
            <SecondaryButton
              label="キャンセル"
              disabled={false}
              handleClick={handleToggleCovidForm}
            />
          </form>
        ) : (
          <PrimaryButton
            type="button"
            label="コロナアンケート"
            disabled={false}
            handleClick={handleToggleCovidForm}
          />
        )}
      </Sectioning>
    );
  },
);

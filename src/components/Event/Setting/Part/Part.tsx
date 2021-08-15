import React from 'react';
import { isPartInvalid } from '../../../../libs/utils/isPartInvalid';
import { Part as TypePart, ChangeOrderPayload } from '../../../../redux/modules/app/part';
import { Heading } from '../../../uiParts/Heading';
import { MiniButton } from '../../../uiParts/MiniButton';
import { PrimaryButton } from '../../../uiParts/PrimaryButton';
import { SecondaryButton } from '../../../uiParts/SecondaryButton';
import { TernaryButton } from '../../../uiParts/TernaryButton';
import styles from './index.module.scss';

type Props = {
  handleToggleSetting: () => void;
  isLoading: boolean;
  handleUpdate: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  part: TypePart[];
  handleChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddPartForm: () => void;
  handleDeletePartForm: () => void;
  handleChangeOrder: (_: ChangeOrderPayload) => void;
};
export const Part: React.VFC<Props> = React.memo(
  ({
    handleToggleSetting,
    isLoading,
    handleUpdate,
    part,
    handleChange,
    handleAddPartForm,
    handleDeletePartForm,
    handleChangeOrder,
  }) => {
    return (
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend>
            <Heading level={3} label="パート 登録フォーム" />
          </legend>
          <div className={styles.remark}>
            出欠表を並び替えるとき時に
            <br />
            表示させたい順番に入力ください
          </div>
          <ul className={styles.list}>
            {part.map((item, index) => (
              <li key={item.id} className={styles.inputWrapper}>
                <label htmlFor="" className={styles.label}>
                  パート{index + 1}
                </label>
                <input
                  type="text"
                  id={`part-${item.id}`}
                  required
                  aria-required
                  maxLength={30}
                  autoComplete="off"
                  disabled={isLoading}
                  value={part.find((prt) => prt.id === item.id)?.name || ''}
                  className={styles.input}
                  onChange={handleChange}
                />
                <div className={styles.miniWrapper}>
                  <MiniButton
                    label="↑"
                    disabled={index === 0 || isLoading}
                    index={index}
                    order={-1}
                    handleClick={handleChangeOrder}
                  />
                  <MiniButton
                    label="↓"
                    disabled={index === part.length - 1 || isLoading}
                    index={index}
                    order={1}
                    handleClick={handleChangeOrder}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.action}>
            <TernaryButton label="追加" disabled={isLoading} handleClick={handleAddPartForm} />
            <TernaryButton label="削除" disabled={isLoading} handleClick={handleDeletePartForm} />
          </div>
        </fieldset>
        <PrimaryButton
          type="submit"
          label="パートの登録"
          disabled={isLoading || isPartInvalid(part)}
          handleClick={handleUpdate}
        />
        <SecondaryButton
          label="キャンセル"
          disabled={isLoading}
          handleClick={handleToggleSetting}
        />
      </form>
    );
  },
);

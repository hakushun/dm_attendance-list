import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleTabDown } from '../libs/utils/handleTabDown';
import {
  closeAllModal,
  selectCovidResultIsShown,
  selectPasswordResetIsShown,
  selectPracticeModalIsShown,
  toggleCovidResult,
  togglePasswordReset,
  togglePracticeModal,
} from '../redux/modules/ui/modal';

type Hooks = {
  modalRef: MutableRefObject<HTMLElement | null>;
  practiceModalIsShown: boolean;
  covidResultIsShown: boolean;
  passwordResetIsShown: boolean;
  handleTogglePracticeModal: () => void;
  handleToggleCovidResult: () => void;
  handleTogglePasswordReset: () => void;
  handleKeydown: (_e: React.KeyboardEvent<HTMLElement>) => void;
};

export const useModal = (): Hooks => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const practiceModalIsShown = useSelector(selectPracticeModalIsShown);
  const covidResultIsShown = useSelector(selectCovidResultIsShown);
  const passwordResetIsShown = useSelector(selectPasswordResetIsShown);

  const handleTogglePracticeModal = useCallback(() => {
    dispatch(togglePracticeModal(!practiceModalIsShown));
    previousFocusRef.current?.focus();
  }, [dispatch, practiceModalIsShown]);

  const handleToggleCovidResult = useCallback(() => {
    dispatch(toggleCovidResult(!covidResultIsShown));
    previousFocusRef.current?.focus();
  }, [covidResultIsShown, dispatch]);

  const handleTogglePasswordReset = useCallback(() => {
    dispatch(togglePasswordReset(!passwordResetIsShown));
    previousFocusRef.current?.focus();
  }, [dispatch, passwordResetIsShown]);

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'Escape':
          dispatch(closeAllModal());
          break;
        case 'Tab':
          handleTabDown(modalRef, e);
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();
  }, [practiceModalIsShown, covidResultIsShown, passwordResetIsShown]);
  return {
    modalRef,
    practiceModalIsShown,
    covidResultIsShown,
    passwordResetIsShown,
    handleTogglePracticeModal,
    handleToggleCovidResult,
    handleTogglePasswordReset,
    handleKeydown,
  };
};

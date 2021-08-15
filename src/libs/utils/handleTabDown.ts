const getFocusableElements = (ref: React.MutableRefObject<HTMLElement | null>) => {
  const focusableElementsString =
    'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"], [contenteditable]';
  return Array.prototype.slice.call(
    ref?.current?.querySelectorAll(focusableElementsString),
  ) as HTMLElement[];
};

const getNextFocusableElement = (
  ref: React.MutableRefObject<HTMLElement | null>,
  backward: boolean,
) => {
  const focusable = getFocusableElements(ref);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (backward && document.activeElement === first) return last;
  if (!backward && document.activeElement === last) return first;
  return null;
};

export const handleTabDown = (
  ref: React.MutableRefObject<HTMLElement | null>,
  e: React.KeyboardEvent<HTMLElement>,
): void => {
  const backward = e.shiftKey;
  const nextFocus = getNextFocusableElement(ref, backward);
  if (nextFocus) {
    e.preventDefault();
    nextFocus.focus();
  }
};

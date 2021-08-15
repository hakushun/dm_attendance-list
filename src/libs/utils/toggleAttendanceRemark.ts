export const toggleAttendanceRemark = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
): void => {
  e.stopPropagation();
  const parent = e.currentTarget.parentElement;
  const target = parent?.querySelector('[data-type="remark"]');

  if (!target) return;

  if (target.getAttribute('data-is-shown') === 'false') {
    target.setAttribute('data-is-shown', 'true');
    return;
  }
  target.setAttribute('data-is-shown', 'false');
};

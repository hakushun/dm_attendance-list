export const hideColumns = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
  const parent = e.currentTarget.parentElement;

  if (!parent) return;

  const targetId = parent.getAttribute('data-columns');
  const targetTable = e.currentTarget.closest('table');

  if (!targetTable) return;

  const targetCells = targetTable.querySelectorAll(`[data-columns="${targetId}"]`);
  targetCells.forEach((target) => {
    target.classList.add('isHidden');
  });
};

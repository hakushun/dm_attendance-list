export const showAllColumns = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
  const targetTable = e.currentTarget.closest('table');

  if (!targetTable) return;

  const targetCells = targetTable.querySelectorAll('.isHidden');
  targetCells.forEach((target) => {
    target.classList.remove('isHidden');
  });
};

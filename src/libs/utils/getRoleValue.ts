import { RoleItem } from '../../redux/modules/app/role';

export const getRoleValue = (roles: RoleItem[], userId: string, programId: string): string => {
  const item = roles.find((role) => role.userId === userId);
  if (!item) return '';
  const role = item[programId];
  if (!role) return '';
  return role;
};

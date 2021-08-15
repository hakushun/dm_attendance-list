import { ProgramItem } from '../../redux/modules/app/program';

export const isProgramInvalid = (programs: ProgramItem[]): boolean => {
  return programs.some((program) => program.name.trim() === '');
};

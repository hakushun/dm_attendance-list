import { getInstance } from './getInstance';
import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/programs';

const db = getInstance();

export const createProgram = async (event: Event): Promise<void> => {
  await db.collection('programs').doc(event.id).set({ program: [] });
};

export const updateProgram = async ({ event, program }: UpdatePayload): Promise<void> => {
  await db.collection('programs').doc(event.id).set({ program }, { merge: true });
};

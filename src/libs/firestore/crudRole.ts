import { Event } from '../../redux/modules/app/event';
import { UpdatePayload } from '../../redux/modules/domain/roles';
import { getInstance } from './getInstance';

const db = getInstance();

export const createRole = async (event: Event): Promise<void> => {
  await db.collection('roles').doc(event.id).set({ roles: [] });
};

export const updateRole = async ({ eventId, roles }: UpdatePayload): Promise<void> => {
  await db.collection('roles').doc(eventId).set({ roles }, { merge: true });
};

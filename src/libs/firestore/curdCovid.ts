import { Covid } from '../../redux/modules/app/covid';
import { CreatePayload, FetchPayload } from '../../redux/modules/domain/covids';
import { getTimestamp } from '../dayjs/getTimestap';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchCovid = async ({ eventId, dateId }: FetchPayload): Promise<Covid[]> => {
  const snapshot = await db
    .collection('covids')
    .doc(eventId)
    .collection('dates')
    .doc(dateId)
    .collection('covid')
    .get();
  const result: Covid[] = [];
  snapshot.forEach((doc) => result.push(doc.data() as Covid));
  return result;
};

export const createCovid = async ({ eventId, covid }: CreatePayload): Promise<void> => {
  await db
    .collection('covids')
    .doc(eventId)
    .collection('dates')
    .doc(covid.dateId)
    .collection('covid')
    .doc(covid.userId)
    .set({ ...covid, timestamp: getTimestamp() }, { merge: true });
};

import { Attendance, AttendanceItem } from '../../redux/modules/app/attendance';
import { Event } from '../../redux/modules/app/event';
import { CreatePayload } from '../../redux/modules/domain/events';
import { getInstance } from './getInstance';

const db = getInstance();

export const fetchEvent = async (id: string): Promise<Event> => {
  const doc = await db.collection('events').doc(id).get();
  return doc.data() as Event;
};

export const createEvent = async (event: CreatePayload): Promise<Event> => {
  const id = await db.collection('events').doc().id;
  await db
    .collection('events')
    .doc(id)
    .set({ ...event, id });
  return fetchEvent(id);
};

const getCurrentAttendances = async (event: Event) => {
  const snapshot = await db.collection('attendances').doc(event.id).collection('attendance').get();
  const result: Attendance[] = [];
  snapshot.forEach((doc) => {
    result.push(doc.data() as Attendance);
  });
  return result;
};
const generateNewAttendances = (event: Event, attendances: Attendance[]) => {
  const result = attendances.map((attendance) => ({
    ...attendance,
    attendances: event.dates.reduce<AttendanceItem[]>((acc, date) => {
      if (attendance.attendances.some((item) => item.dateId === date.id)) {
        acc.push(attendance.attendances.find((item) => item.dateId === date.id)!);
        return acc;
      }
      acc.push({ dateId: date.id, attendance: 'presence', remark: '' });
      return acc;
    }, []),
  }));
  return result;
};

export const updateEvent = async (event: Event): Promise<Event> => {
  await db.collection('events').doc(event.id).set(event, { merge: true });
  // 追加になった日時に紐づくpracticeを作成
  await Promise.all(
    event.dates.map((date) => {
      const practice = {
        location: { dateId: date.id },
        plan: { dateId: date.id },
        remark: { dateId: date.id },
      };
      return db
        .collection('practices')
        .doc(event.id)
        .collection('practice')
        .doc(date.id)
        .set(practice, { merge: true });
    }),
  );
  // 追加/削除になっ練習日時に紐づくattendanceを追加/削除
  // 登録されてる出欠の数が多いと処理の負荷が増大
  const currentAttendances = await getCurrentAttendances(event);
  const newAttendances = generateNewAttendances(event, currentAttendances);
  await Promise.all(
    newAttendances.map((item) =>
      db
        .collection('attendances')
        .doc(event.id)
        .collection('attendance')
        .doc(item.userId)
        .set(item, { merge: true }),
    ),
  );
  return fetchEvent(event.id!);
};

export const removeEvent = async (event: Event): Promise<void> => {
  await db.collection('events').doc(event.id).delete();
  await db.collection('parts').doc(event.id).delete();
  await Promise.all(
    event.dates.map((date) =>
      db.collection('practices').doc(event.id).collection('practice').doc(date.id).delete(),
    ),
  );
  await db.collection('programs').doc(event.id).delete();
  await db.collection('roles').doc(event.id).delete();
};

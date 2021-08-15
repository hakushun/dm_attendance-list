// async action
/* eslint-disable no-undefined */
import { AnyAction, Middleware } from 'redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as module from '../../../libs/firestore/crudAttendance';
import { Attendance } from '../app/attendance';
import reducer, {
  Attendances,
  create,
  CrudPayload,
  remove,
  subscribeAtendances,
  update,
} from '../domain/attendances';

describe('Async action: attendances', () => {
  interface Ext {
    dispatch: ThunkDispatch<Attendances, Attendances, AnyAction>;
  }
  type StoreType = MockStore<Attendances> & Ext;
  let middleware: Middleware[] = [];
  let createMockStore: (_: Attendances) => StoreType;
  let mockStore: StoreType;

  beforeEach(() => {
    middleware = [thunk];
    createMockStore = configureMockStore(middleware);
    mockStore = createMockStore({
      attendances: [],
      isLoading: false,
    });
  });

  it('create: succeed', async () => {
    jest.spyOn(module, 'createAttendance').mockImplementationOnce(async () => Promise.resolve());
    const payload: CrudPayload = {
      eventId: '123456',
      attendance: {
        comment: 'コメント',
        name: 'sample user1',
        attendances: [
          {
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
            remark: '',
            attendance: 'presence',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
            attendance: 'undecided',
            remark: '15時早退',
          },
          {
            remark: '',
            attendance: 'absence',
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
        occupation: 'working',
        part: 'Perc',
        userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      },
    };
    const expectedActions = [
      create.async.started(payload),
      create.async.done({ params: payload, result: undefined }),
    ];
    await mockStore.dispatch(create(payload));
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
  it('update: succeed', async () => {
    jest.spyOn(module, 'updateAttendance').mockImplementationOnce(async () => Promise.resolve());
    const payload: CrudPayload = {
      eventId: '123456',
      attendance: {
        comment: 'コメント',
        name: 'sample user1',
        attendances: [
          {
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
            remark: '',
            attendance: 'presence',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
            attendance: 'undecided',
            remark: '15時早退',
          },
          {
            remark: '',
            attendance: 'absence',
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
        occupation: 'working',
        part: 'Perc',
        userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      },
    };
    const expectedActions = [
      update.async.started(payload),
      update.async.done({ params: payload, result: undefined }),
    ];
    await mockStore.dispatch(update(payload));
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
  it('remove: succeed', async () => {
    jest.spyOn(module, 'removeAttendance').mockImplementationOnce(async () => Promise.resolve());
    const payload: CrudPayload = {
      eventId: '123456',
      attendance: {
        comment: 'コメント',
        name: 'sample user1',
        attendances: [
          {
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
            remark: '',
            attendance: 'presence',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
            attendance: 'undecided',
            remark: '15時早退',
          },
          {
            remark: '',
            attendance: 'absence',
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
        occupation: 'working',
        part: 'Perc',
        userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      },
    };
    const expectedActions = [
      remove.async.started(payload),
      remove.async.done({ params: payload, result: undefined }),
    ];
    await mockStore.dispatch(remove(payload));
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
});

// reducer
describe('Reducer: attendances', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      attendances: [],
      isLoading: false,
    });
  });
  it('Action: subscribeAtendances', () => {
    const payload: Attendance[] = [
      {
        occupation: 'extra',
        attendances: [
          {
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
            remark: '',
            attendance: 'absence',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
            attendance: 'undecided',
            remark: '',
          },
          {
            attendance: 'presence',
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
            remark: '',
          },
        ],
        part: 'Hr',
        comment: '',
        name: 'sample user2',
        userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
      },
      {
        comment: 'コメント',
        name: 'sample user1',
        attendances: [
          {
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
            remark: '',
            attendance: 'presence',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
            attendance: 'undecided',
            remark: '15時早退',
          },
          {
            remark: '',
            attendance: 'absence',
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
        occupation: 'working',
        part: 'Perc',
        userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      },
    ];
    const action = subscribeAtendances(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      attendances: [
        {
          occupation: 'extra',
          attendances: [
            {
              dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
              remark: '',
              attendance: 'absence',
            },
            {
              dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
              attendance: 'undecided',
              remark: '',
            },
            {
              attendance: 'presence',
              dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
              remark: '',
            },
          ],
          part: 'Hr',
          comment: '',
          name: 'sample user2',
          userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
        },
        {
          comment: 'コメント',
          name: 'sample user1',
          attendances: [
            {
              dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
              remark: '',
              attendance: 'presence',
            },
            {
              dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
              attendance: 'undecided',
              remark: '15時早退',
            },
            {
              remark: '',
              attendance: 'absence',
              dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
            },
          ],
          occupation: 'working',
          part: 'Perc',
          userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
        },
      ],
      isLoading: false,
    });
  });
});

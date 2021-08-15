import { RootState } from '../reducers';

export const initialState: RootState = {
  domain: {
    attendances: {
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
    },
    covids: {
      covids: [
        {
          timestamp: 1624680005244,
          userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
          answers: {
            covid_q1: 'no',
            covid_q2: 'no',
            covid_q0: 'no',
          },
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
        },
      ],
      isLoading: false,
    },
    events: {
      events: [
        {
          dates: [
            {
              day: '2021-06-16',
              id: '01F89Q4JRDGPVVKFH83R3TFH9E',
              time: '13:00~17:00',
            },
            {
              day: '2021-06-17',
              time: '13:00~17:00',
              id: '01F89Q4KSKJBMADR0A8SAVJGBY',
            },
            {
              id: '01F89Q4MCXQNJYAB0W4XT88FVS',
              day: '2021-06-18',
              time: '13:00~17:00',
            },
            {
              day: '2021-06-19',
              id: '01F89Q4MWN0KGB6CH2VDJRDE1K',
              time: '13:00~17:00',
            },
            {
              id: '01F89Q4NFAY63FQ0YXT6JHVTEG',
              time: '13:00~17:00',
              day: '2021-06-20',
            },
            {
              day: '2021-06-21',
              time: '13:00~17:00',
              id: '01F89Q4P178G7VP6F0KHY2EN9S',
            },
            {
              time: '13:00~17:00',
              day: '2021-06-22',
              id: '01F89Q4PR9W9ZZB0W9ENWA34XT',
            },
          ],
          title: 'テスト用演奏会',
          id: 'FPrNjRWVTvJCJTuGNVSG',
          detail: 'ここにイベント詳細が表示されます',
        },
        {
          id: 'ynwbWy11Lws3O9wFyWdg',
          dates: [
            {
              time: '13:00~17:00',
              id: '01F937G4BYBXW1QRV8BYH1VX9Z',
              day: '2021-06-26',
            },
            {
              time: '13:00~17:00',
              day: '2021-06-27',
              id: '01F937GTKXDPW3BD3T6KYZBY9N',
            },
            {
              time: '13:00~17:00',
              id: '01F937GV9SP8WNQFTAYC3K1YSQ',
              day: '2021-06-28',
            },
          ],
          title: 'sample concert',
          detail: 'This is a sample concert.',
        },
      ],
      isLoading: false,
    },
    parts: {
      parts: [
        {
          name: 'Fl',
          id: '01F937G3VMXWPPEV6WN1TJ51QW',
        },
        {
          id: '01F937G3VM7M7HZ9QMRVM02E05',
          name: 'Ob',
        },
        {
          id: '01F937G3VMD2V6SGKH904QP5E0',
          name: 'Cl',
        },
        {
          name: 'Fg',
          id: '01F937G3VM3JXMB12ZABPWVX4E',
        },
        {
          id: '01F937G3VMXKJ833ZYG9RXF2V9',
          name: 'Hr',
        },
        {
          id: '01F937G3VMFEQFXG17HW1GNZQX',
          name: 'Tp',
        },
        {
          name: 'Tb',
          id: '01F937G3VMT251EEC0HTZBV8ES',
        },
        {
          id: '01F937G3VM6BPYJ87X5BPRJYNR',
          name: 'Tuba',
        },
        {
          name: 'Perc',
          id: '01F937G3VMBKBBE11H2NSZ2YBN',
        },
        {
          name: 'Vn',
          id: '01F937G3VMEB4RY6BKTWX5VJW6',
        },
        {
          id: '01F937G3VM5710CZ2T5BY5G8KH',
          name: 'Va',
        },
        {
          id: '01F937G3VMC115BSGV7STWCAS5',
          name: 'Vc',
        },
        {
          id: '01F937G3VMZJNYQWV013TNMNG3',
          name: 'Cb',
        },
      ],
      isLoading: false,
    },
    practice: {
      practice: {
        remarks: [
          {
            content: '譜面台持参',
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          },
          {
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
        locations: [
          {
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
            name2: '練習室',
            url: 'https://www.google.co.jp/',
            name1: '区民館',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          },
          {
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
        plans: [
          {
            schedule: '13:00~ 準備\n14:00~ 練習1\n15:00~ 練習2\n16:00~ 片付け',
            category: '団員合奏',
            dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          },
          {
            dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          },
          {
            dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          },
        ],
      },
      dateId: '',
      isLoading: false,
    },
    programs: {
      programs: [
        {
          name: '１曲目',
          id: '01F937NK2V8K2W2F6QC9PKJZRP',
        },
        {
          name: '２曲目',
          id: '01F937NXKS2YDN1M98MZ9G1JWB',
        },
      ],
      isLoading: false,
    },
    roles: {
      roles: [
        {
          userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
          '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
          '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
        },
        {
          userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
          '01F937NK2V8K2W2F6QC9PKJZRP': '降り番',
          '01F937NXKS2YDN1M98MZ9G1JWB': '乗り番',
        },
      ],
      isLoading: false,
    },
  },
  app: {
    attendance: {
      userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
      occupation: 'extra',
      name: 'sample user2',
      part: 'Hr',
      attendances: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          attendance: 'absence',
          remark: '',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
          attendance: 'undecided',
          remark: '',
        },
        {
          dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
          attendance: 'presence',
          remark: '',
        },
      ],
      comment: '',
    },
    covid: {
      dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
      userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
      answers: {
        covid_q0: 'no',
        covid_q1: 'no',
        covid_q2: 'no',
      },
    },
    event: {
      id: 'ynwbWy11Lws3O9wFyWdg',
      dates: [
        {
          time: '13:00~17:00',
          id: '01F937G4BYBXW1QRV8BYH1VX9Z',
          day: '2021-06-26',
        },
        {
          time: '13:00~17:00',
          day: '2021-06-27',
          id: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          time: '13:00~17:00',
          id: '01F937GV9SP8WNQFTAYC3K1YSQ',
          day: '2021-06-28',
        },
      ],
      title: 'sample concert',
      detail: 'This is a sample concert.',
    },
    locations: {
      locations: [
        {
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
          name2: '練習室',
          url: 'https://www.google.co.jp/',
          name1: '区民館',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
        },
      ],
    },
    part: [
      {
        name: 'Fl',
        id: '01F937G3VMXWPPEV6WN1TJ51QW',
      },
      {
        id: '01F937G3VM7M7HZ9QMRVM02E05',
        name: 'Ob',
      },
      {
        id: '01F937G3VMD2V6SGKH904QP5E0',
        name: 'Cl',
      },
      {
        name: 'Fg',
        id: '01F937G3VM3JXMB12ZABPWVX4E',
      },
      {
        id: '01F937G3VMXKJ833ZYG9RXF2V9',
        name: 'Hr',
      },
      {
        id: '01F937G3VMFEQFXG17HW1GNZQX',
        name: 'Tp',
      },
      {
        name: 'Tb',
        id: '01F937G3VMT251EEC0HTZBV8ES',
      },
      {
        id: '01F937G3VM6BPYJ87X5BPRJYNR',
        name: 'Tuba',
      },
      {
        name: 'Perc',
        id: '01F937G3VMBKBBE11H2NSZ2YBN',
      },
      {
        name: 'Vn',
        id: '01F937G3VMEB4RY6BKTWX5VJW6',
      },
      {
        id: '01F937G3VM5710CZ2T5BY5G8KH',
        name: 'Va',
      },
      {
        id: '01F937G3VMC115BSGV7STWCAS5',
        name: 'Vc',
      },
      {
        id: '01F937G3VMZJNYQWV013TNMNG3',
        name: 'Cb',
      },
    ],
    plans: {
      plans: [
        {
          schedule: '13:00~ 準備\n14:00~ 練習1\n15:00~ 練習2\n16:00~ 片付け',
          category: '団員合奏',
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
        },
      ],
    },
    program: {
      selectedId: '',
      program: [
        {
          name: '１曲目',
          id: '01F937NK2V8K2W2F6QC9PKJZRP',
        },
        {
          name: '２曲目',
          id: '01F937NXKS2YDN1M98MZ9G1JWB',
        },
      ],
    },
    remarks: {
      remarks: [
        {
          content: '譜面台持参',
          dateId: '01F937G4BYBXW1QRV8BYH1VX9Z',
        },
        {
          dateId: '01F937GTKXDPW3BD3T6KYZBY9N',
        },
        {
          dateId: '01F937GV9SP8WNQFTAYC3K1YSQ',
        },
      ],
    },
    role: {
      programId: '01F937NXKS2YDN1M98MZ9G1JWB',
      role: [
        {
          userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
          '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
          '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
        },
        {
          userId: 'AnT5kMzmdJbgexROAlSoHP0KEC12',
          '01F937NK2V8K2W2F6QC9PKJZRP': '降り番',
          '01F937NXKS2YDN1M98MZ9G1JWB': '乗り番',
        },
      ],
    },
    sign: {
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    },
    user: {
      user: {
        id: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
        email: 'hakushun.pianist@gmail.com',
      },
      isLoading: false,
    },
  },
  ui: {
    dialog: {
      isOpened: false,
      message: {
        title: '',
        description: '',
      },
    },
    modal: {
      practice: false,
      covidResult: false,
      passwordReset: false,
    },
    show: {
      eventForm: false,
      covidForm: false,
      attendanceForm: false,
      setting: false,
    },
    tab: {
      setting: 'practice',
    },
  },
};

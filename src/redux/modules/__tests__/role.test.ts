/* eslint-disable no-undefined */
import reducer, { changeRadio, changeRole, selectProgramId, selectRole } from '../app/role';
import { subscribeRoles } from '../domain/roles';
import { initialState } from './_initialState';

// reducer
describe('Reducer: role', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      programId: '',
      role: [],
    });
  });
  it('Action: changeRadio', () => {
    const payload = { programId: '1234567' };
    const action = changeRadio(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      programId: '1234567',
      role: [],
    });
  });
  it('Action: changeRole', () => {
    const state = {
      programId: '',
      role: [
        {
          userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
          '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
        },
      ],
    };
    const payload = {
      userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
    };
    const action = changeRole(payload);
    const result = reducer(state, action);
    expect(result).toEqual({
      programId: '',
      role: [
        {
          userId: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
          '01F937NXKS2YDN1M98MZ9G1JWB': '降り番',
          '01F937NK2V8K2W2F6QC9PKJZRP': '乗り番',
        },
      ],
    });
  });
  it('Action: subscribeRoles', () => {
    const payload = [
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
    ];
    const action = subscribeRoles(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      programId: '',
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
    });
  });
});

// selector
describe('Selector: role', () => {
  it('selectProgramId', () => {
    const result = '01F937NXKS2YDN1M98MZ9G1JWB';
    expect(result).toEqual(selectProgramId(initialState));
  });
  it('selectRole', () => {
    const result = [
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
    ];
    expect(result).toEqual(selectRole(initialState));
  });
});

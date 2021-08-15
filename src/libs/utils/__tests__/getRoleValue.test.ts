import { RoleItem } from '../../../redux/modules/app/role';
import { getRoleValue } from '../getRoleValue';

describe('getRoleValue', () => {
  const userId = 'gWGFZShxTVZieKGPDTGELbC8Ser2';
  const programId = '01F937NXKS2YDN1M98MZ9G1JWB';

  it('未入力のパターン', () => {
    const roles: RoleItem[] = [];
    const result = '未入力';
    expect(result).toEqual(getRoleValue(roles, userId, programId));
  });

  it('入力済のパターン', () => {
    const roles: RoleItem[] = [
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
    const result = '降り番';
    expect(result).toEqual(getRoleValue(roles, userId, programId));
  });
});

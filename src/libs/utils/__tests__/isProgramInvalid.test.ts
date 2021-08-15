import { isProgramInvalid } from '../isProgramInvalid';

describe('isProgramInvalid', () => {
  it('nameがfalsy', () => {
    const program = [
      {
        name: '１曲目',
        id: '01F937NK2V8K2W2F6QC9PKJZRP',
      },
      {
        name: '',
        id: '01F937NXKS2YDN1M98MZ9G1JWB',
      },
    ];
    const result = true;
    expect(result).toEqual(isProgramInvalid(program));
  });
  it('問題ない場合', () => {
    const program = [
      {
        name: '１曲目',
        id: '01F937NK2V8K2W2F6QC9PKJZRP',
      },
      {
        name: '２曲目',
        id: '01F937NXKS2YDN1M98MZ9G1JWB',
      },
    ];
    const result = false;
    expect(result).toEqual(isProgramInvalid(program));
  });
});

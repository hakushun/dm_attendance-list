import { Part } from '../../../redux/modules/app/part';
import { isPartInvalid } from '../isPartInvalid';

describe('isPartInvalid', () => {
  it('nameがfalsy', () => {
    const part: Part[] = [
      {
        name: '',
        id: '01F937G3VMXWPPEV6WN1TJ51QW',
      },
      {
        id: '01F937G3VM7M7HZ9QMRVM02E05',
        name: 'Ob',
      },
    ];
    const result = true;
    expect(result).toEqual(isPartInvalid(part));
  });
  it('問題ない場合', () => {
    const part = [
      {
        name: 'Fl',
        id: '01F937G3VMXWPPEV6WN1TJ51QW',
      },
      {
        id: '01F937G3VM7M7HZ9QMRVM02E05',
        name: 'Ob',
      },
    ];
    const result = false;
    expect(result).toEqual(isPartInvalid(part));
  });
});

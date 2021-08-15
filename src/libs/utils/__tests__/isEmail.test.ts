import { isEmail } from '../isEmail';

describe('isEmail', () => {
  it('問題ある場合', () => {
    const invalidEmail = 'sample@sample.c';
    const result = false;
    expect(result).toEqual(isEmail(invalidEmail));
  });
  it('問題ない場合', () => {
    const validEmail = 'sample@sample.com';
    const result = true;
    expect(result).toEqual(isEmail(validEmail));
  });
});

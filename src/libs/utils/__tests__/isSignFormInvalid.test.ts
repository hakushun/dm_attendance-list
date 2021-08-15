import { isSignFormInvalid } from '../isSignFormInvalid';

describe('isSignFormInvalid', () => {
  const baseValue = {
    email: 'sample@sample.com',
    password: 'sample',
  };
  it('emailがfalsy', () => {
    const value = {
      ...baseValue,
      email: '',
    };
    const result = true;
    expect(result).toEqual(isSignFormInvalid(value));
  });
  it('passwordがfalsy', () => {
    const value = {
      ...baseValue,
      password: '',
    };
    const result = true;
    expect(result).toEqual(isSignFormInvalid(value));
  });
  it('問題ない場合', () => {
    const result = false;
    expect(result).toEqual(isSignFormInvalid(baseValue));
  });
});

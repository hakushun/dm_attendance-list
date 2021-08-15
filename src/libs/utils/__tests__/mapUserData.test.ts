import { mapUserData } from '../mapUserData';

describe('mapUserData', () => {
  it('問題ない場合', () => {
    const user = {
      uid: '123456789',
      email: 'sample@sample.com',
    };
    const result = {
      id: '123456789',
      email: 'sample@sample.com',
    };
    expect(result).toEqual(mapUserData(user));
  });

  it('emailがfalsy', () => {
    const user = {
      uid: '123456789',
      email: null,
    };
    const result = {
      id: '123456789',
      email: '',
    };
    expect(result).toEqual(mapUserData(user));
  });
});

import { isSuperuser } from '../isSuperuser';

describe('isSuperuser', () => {
  it('not superuser', () => {
    const user = {
      id: 'yfubjnklmdxftcgyvhbj',
      email: 'sample@sample.com',
    };
    const result = false;
    expect(result).toEqual(isSuperuser(user));
  });
  it('is superuser', () => {
    const user = {
      id: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      email: 'sample@sample.com',
    };
    const result = true;
    expect(result).toEqual(isSuperuser(user));
  });
});

/* eslint-disable no-undefined */
import { signIn, signOut, signUp } from '../app/sign';
import reducer, { auth, selectIsLoading, selectUser, setLoading } from '../app/user';
import { initialState } from './_initialState';

// reducer
describe('Reducer: user', () => {
  it('Initial state', () => {
    const reuslt = reducer(undefined, { type: '' });
    expect(reuslt).toEqual({
      user: null,
      isLoading: true,
    });
  });
  it('Action: auth', () => {
    const payload = {
      id: '1234567',
      email: 'sample@sample.com',
    };
    const action = auth(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      user: {
        id: '1234567',
        email: 'sample@sample.com',
      },
      isLoading: false,
    });
  });
  it('Action: setLoading', () => {
    const action = setLoading(false);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      user: null,
      isLoading: false,
    });
  });
  it('Action: signUp.async.done', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const user = {
      id: '1234567',
      email: 'sample@sample.com',
    };
    const action = signUp.async.done({ params: payload, result: user });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      user: {
        id: '1234567',
        email: 'sample@sample.com',
      },
      isLoading: false,
    });
  });
  it('Action: signIn.async.done', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const user = {
      id: '1234567',
      email: 'sample@sample.com',
    };
    const action = signIn.async.done({ params: payload, result: user });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      user: {
        id: '1234567',
        email: 'sample@sample.com',
      },
      isLoading: false,
    });
  });
  it('Action: signOut.async.done', () => {
    const action = signOut.async.done({ result: undefined });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      user: null,
      isLoading: false,
    });
  });
});

// selector
describe('Selector: user', () => {
  it('selectUser', () => {
    const result = {
      id: 'gWGFZShxTVZieKGPDTGELbC8Ser2',
      email: 'hakushun.pianist@gmail.com',
    };
    expect(result).toEqual(selectUser(initialState));
  });
  it('selectIsLoading', () => {
    const result = false;
    expect(result).toEqual(selectIsLoading(initialState));
  });
});

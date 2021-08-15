/* eslint-disable no-undefined */
import { AnyAction, Middleware } from 'redux';
import configureMockStore, { MockStore } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as module from '../../../libs/firebase/firebaseAuth';
import reducer, {
  change,
  changeResetForm,
  resetPassword,
  selectIsLoading,
  selectResetForm,
  selectSignForm,
  Sign,
  signIn,
  signOut,
  signUp,
} from '../app/sign';
import { initialState } from './_initialState';

// async action
describe('Async action: sign', () => {
  interface Ext {
    dispatch: ThunkDispatch<Sign, Sign, AnyAction>;
  }
  type StoreType = MockStore<Sign> & Ext;
  let middleware: Middleware[] = [];
  let createMockStore: (_: Sign) => StoreType;
  let mockStore: StoreType;

  beforeEach(() => {
    middleware = [thunk];
    createMockStore = configureMockStore(middleware);
    mockStore = createMockStore({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });

  it('signUp: success', async () => {
    const userdata = {
      id: '123456789',
      email: 'sample@sample.com',
    };
    jest
      .spyOn(module, 'signUpWithFirebase')
      .mockImplementationOnce(async () => Promise.resolve(userdata));
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const expectedActions = [
      signUp.async.started(payload),
      signUp.async.done({ params: payload, result: userdata }),
    ];
    await mockStore.dispatch(signUp(payload));
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
  it('signIn: success', async () => {
    const userdata = {
      id: '123456789',
      email: 'sample@sample.com',
    };
    jest
      .spyOn(module, 'signInWithFirebase')
      .mockImplementationOnce(async () => Promise.resolve(userdata));
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const expectedActions = [
      signIn.async.started(payload),
      signIn.async.done({ params: payload, result: userdata }),
    ];
    await mockStore.dispatch(signIn(payload));
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
  it('signOut: success', async () => {
    jest.spyOn(module, 'signOutWithFirebase').mockImplementationOnce(async () => Promise.resolve());
    const expectedActions = [
      signOut.async.started(),
      signOut.async.done({ params: undefined, result: undefined }),
    ];
    await mockStore.dispatch(signOut());
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
  it('resetPassword: success', async () => {
    jest.spyOn(module, 'resetUserPassword').mockImplementationOnce(async () => Promise.resolve());
    const payload = {
      email: 'sample@sample.com',
    };
    const expectedActions = [
      resetPassword.async.started(payload),
      resetPassword.async.done({ params: payload, result: undefined }),
    ];
    await mockStore.dispatch(resetPassword(payload));
    expect(mockStore.getActions()).toEqual(expectedActions);
  });
});

// reducer
describe('Reducer: sign', () => {
  it('Initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('Action: change(email)', () => {
    const payload = {
      email: 'sample@sample.com',
    };
    const action = change(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: 'sample@sample.com',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('Action: change(password)', () => {
    const payload = {
      password: '123456',
    };
    const action = change(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '123456',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('changeResetForm', () => {
    const payload = {
      email: 'sample@sample.com',
    };
    const action = changeResetForm(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: 'sample@sample.com',
      },
      isLoading: false,
    });
  });
  it('signUp.async.started', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const action = signUp.async.started(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: true,
    });
  });
  it('signUp.async.done', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const userdata = {
      id: '123456',
      email: 'sample@sample.com',
    };
    const action = signUp.async.done({ params: payload, result: userdata });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('signUp.async.failed', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const error = {
      name: 'error',
      code: 'Invalid',
      message: 'This is a critical error.',
    };
    const action = signUp.async.failed({ params: payload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('signIn.async.started', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const action = signIn.async.started(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: true,
    });
  });
  it('signIn.async.done', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const userdata = {
      id: '123456',
      email: 'sample@sample.com',
    };
    const action = signIn.async.done({ params: payload, result: userdata });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('signIn.async.failed', () => {
    const payload = {
      email: 'sample@sample.com',
      password: '123456',
    };
    const error = {
      name: 'error',
      code: 'Invalid',
      message: 'This is a critical error.',
    };
    const action = signIn.async.failed({ params: payload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('signOut.async.started', () => {
    const action = signOut.async.started();
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: true,
    });
  });
  it('signOut.async.done', () => {
    const action = signOut.async.done({ params: undefined, result: undefined });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('signOut.async.failed', () => {
    const error = {
      name: 'error',
      code: 'Invalid',
      message: 'This is a critical error.',
    };
    const action = signOut.async.failed({ params: undefined, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('resetPassword.async.started', () => {
    const payload = {
      email: 'sample@sample.com',
    };
    const action = resetPassword.async.started(payload);
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: true,
    });
  });
  it('resetPassword.async.done', () => {
    const payload = {
      email: 'sample@sample.com',
    };
    const action = resetPassword.async.done({ params: payload, result: undefined });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
  it('resetPassword.async.failed', () => {
    const payload = {
      email: 'sample@sample.com',
    };
    const error = {
      name: 'error',
      code: 'Invalid',
      message: 'This is a critical error.',
    };
    const action = resetPassword.async.failed({ params: payload, error });
    const result = reducer(undefined, action);
    expect(result).toEqual({
      form: {
        email: '',
        password: '',
      },
      resetForm: {
        email: '',
      },
      isLoading: false,
    });
  });
});

// selector
describe('Selector: sign', () => {
  it('selectSignForm', () => {
    const result = {
      email: '',
      password: '',
    };
    expect(result).toEqual(selectSignForm(initialState));
  });
  it('selectResetForm', () => {
    const result = {
      email: '',
    };
    expect(result).toEqual(selectResetForm(initialState));
  });
  it('selectIsLoading', () => {
    const result = false;
    expect(result).toEqual(selectIsLoading(initialState));
  });
});

import firebase from 'firebase/app';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initFirebase from '../libs/firebase/initFirebase';
import { mapUserData } from '../libs/utils/mapUserData';
import { selectIsLoading, selectUser, auth, Userdata } from '../redux/modules/app/user';
import { useRouter } from './useRouter';

initFirebase();

type Hooks = {
  user: Userdata;
  isLoading: boolean;
};
export const useUser = (): Hooks => {
  const dispatch = useDispatch();
  const { router } = useRouter();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (usr) => {
      if (usr) {
        dispatch(auth(mapUserData(usr)));
      } else {
        dispatch(auth(null));
        router.pathname !== '/signup' && router.push('/login');
      }
    });
    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoading };
};
